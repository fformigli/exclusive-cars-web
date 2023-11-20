import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { BudgetDetail, WorkOrder } from "@prisma/client";
import {
  validateBudgetDetailReferenceId,
  validateBudgetReferenceId,
  validateWorkOrderReferenceId
} from "../lib/prisma/utils";
import { BUDGET_STATES } from "../lib/constants/general";
import { getCombosFromTranslateConstants } from "../lib/constants/functions";
import { BUDGET_STATES_TRANSLATE } from "../lib/constants/translate";
import { getQueryString } from "../lib/helpers";

/**
 * endpoint para recuperar el presupuesto más nuevo asociado a una orden de trabajo
 * @param req
 * @param res
 */
export const getWorkOrderLatestBudget = async (req: Request, res: Response) => {
  try {
    const workOrderId = parseInt(req.params.workOrderId, 10)
    const workOrder = await validateWorkOrderReferenceId(workOrderId, { Client: true })

    const dataForm: any = {
      budget: await getLatestBudgetOrCreate(workOrder, req.user.id),
      budgetStates: getCombosFromTranslateConstants(BUDGET_STATES_TRANSLATE),
      BUDGET_STATES_TRANSLATE,
      cancelPath: `/work-orders/edit/${workOrderId}`
    }

    return res.render('budgets/form.hbs', dataForm)
  } catch (e: any) {
    console.error(e);
    req.flash('message', 'Error: ' + (e?.message ?? e));
    return res.redirect('/profile');
  }
}

/**
 * retorna el presupuesto más nuevo de una orden de trabajo
 * si no existe crea uno
 * @param workOrder
 * @param userId
 */
const getLatestBudgetOrCreate = async (workOrder: WorkOrder, userId: number) => {
  let budget = await getLatestBudget(workOrder)
  console.log('existe un budget', budget)

  if (!budget?.id) {
    // create an empty budget
    await createBudgetFromWorkOrder(workOrder.id, workOrder.clientId, userId)
    budget = await getLatestBudget(workOrder)
  }

  return budget
}

export const getLatestBudget = async (workOrder: WorkOrder) => {
  let budget: any
  let budgets = await prisma.budget.findMany({
    where: { workOrderId: workOrder.id },
    orderBy: { id: 'desc' },
    include: { Client: { include: { User: true } }, BudgetDetails: true }
  })

  budget = budgets?.[0] ?? {}

  // calculamos el total del budget si el budget existe o no tiene detalles, asigna cero
  budget.totalAmount = budget?.BudgetDetails?.reduce((total: bigint, detail: BudgetDetail) => total + BigInt(detail.quantity) * detail.unitaryPrice, BigInt(0)) ?? 0

  return budget
}

export const addBudgetDetail = async (req: Request, res: Response) => {
  console.log('addBudgetDetail start')
  const budgetId: number = parseInt(req.params?.budgetId, 10)
  const { concept, quantity, price, additionalData = '' } = req.body

  const budget = await validateBudgetReferenceId(budgetId)
  try {
    await prisma.budgetDetail.create({
      data: {
        Budget: {
          connect: {
            id: budget.id
          }
        },
        additionalData,
        concept,
        quantity: +quantity,
        unitaryPrice: +price
      }
    })

    req.flash('success', 'Detalle agregado');
    res.redirect(`/work-orders/${budget.workOrderId}/budgets`);
  } catch (err: any) {
    console.error(err)
    const query = getQueryString(req.body)
    req.flash('message', 'Error: ' + err.message)
    res.redirect(`/work-orders/${budget.workOrderId}/budgets?${query}`);
  }
}

export const deleteBudgetDetail = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)

  const budgetDetail = await validateBudgetDetailReferenceId(id, { Budget: true })
  try {
    await prisma.budgetDetail.delete({
      where: {
        id
      }
    })

    req.flash('success', 'Detalle agregado');
    res.redirect(`/work-orders/${budgetDetail.Budget.workOrderId}/budgets`);
  } catch (err: any) {
    console.error(err)
    const query = getQueryString(req.body)
    req.flash('message', 'Error: ' + err.message)
    res.redirect(`/work-orders/${budgetDetail.Budget.workOrderId}/budgets?${query}`);
  }
}


export const budgetFeedback = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)
  const { feedback } = req.params

  const budget = await validateBudgetReferenceId(id, { BudgetDetails: true })
  try {
    if (!budget.BudgetDetails?.length) {
      throw { message: 'El presupuesto no tiene detalles' }
    }

    console.log('budget state', feedback, BUDGET_STATES[feedback])

    await prisma.budget.update({
      where: {
        id
      },
      data: {
        state: BUDGET_STATES[feedback],
        feedbackTimestamp: new Date(),
        FeedbackBy: {
          connect: {
            id: req.user.id
          }
        }
      }
    })

    req.flash('success', 'Presupuesto actualizado');
    res.redirect(`/work-orders/${budget.workOrderId}/budgets`);
  } catch (err: any) {
    console.error(err)
    const query = getQueryString(req.body)
    req.flash('message', 'Error: ' + err.message)
    res.redirect(`/work-orders/${budget.workOrderId}/budgets`);
  }
}

export const createNewBudget = async (req: Request, res: Response) => {
  try {
    const workOrderId = parseInt(req.params.workOrderId, 10)
    const workOrder = await validateWorkOrderReferenceId(workOrderId, { Client: true })

    await createBudgetFromWorkOrder(workOrder.id, workOrder.clientId, req.user.id)

    res.redirect(`/work-orders/${workOrderId}/budgets`);
  } catch (e: any) {
    console.error(e);
    req.flash('message', 'Error: ' + (e?.message ?? e));
    return res.redirect('/profile');
  }
}

const createBudgetFromWorkOrder = async (workOrderId: number, clientId: number, userId: number) => {
  console.log('creando budget')
  return prisma.budget.create({
    data: {
      WorkOrder: {
        connect: { id: workOrderId }
      },
      Client: {
        connect: { id: clientId }
      },
      CreatedBy: {
        connect: {
          id: userId
        }
      },
      state: BUDGET_STATES.PENDING
    }
  })
}

export const getBudgetsList = async (req: Request, res: Response) => {
  try {
    let dataForm: any = {
      filter: req.query,
      BUDGET_STATES_TRANSLATE
    }


    const where: any = {}
    if (req.query?.search) {
      where.Client = {
        User: {
          fullName: {
            contains: req.query.search,
            mode: 'insensitive'
          }
        }
      }
    }

    if (req.query?.state) {
      where.state = +req.query.state
    }

    dataForm.budgets = await prisma.budget.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        BudgetDetails: true,
        Client: {
          include: {
            User: true
          }
        }
      },
      where
    })

    console.log(dataForm)

    dataForm.budgets.map((d: any) => {
      d.totalAmount = d?.BudgetDetails?.reduce((total: bigint, detail: BudgetDetail) => total + BigInt(detail.quantity) * detail.unitaryPrice, BigInt(0)) ?? 0
      return d
    })

    return res.render('budgets/list.hbs', dataForm);

  } catch (e: any) {
    console.error(e);
    req.flash('message', 'Error: ' + (e.message ?? e));
    return res.redirect('/');
  }
}

export const getBudget = async (req: Request, res: Response) => {
  try {
    const budgetId = parseInt(req.params.budgetId, 10)
    const budget = await validateBudgetReferenceId(budgetId, {
      Client: { include: { User: true } },
      BudgetDetails: true
    })

    budget.totalAmount = budget?.BudgetDetails?.reduce((total: bigint, detail: BudgetDetail) => total + BigInt(detail.quantity) * detail.unitaryPrice, BigInt(0)) ?? 0
    const dataForm: any = {
      budget,
      budgetStates: getCombosFromTranslateConstants(BUDGET_STATES_TRANSLATE),
      BUDGET_STATES_TRANSLATE,
      cancelPath: `/budgets`
    }

    return res.render('budgets/form.hbs', dataForm)
  } catch (e: any) {
    console.error(e);
    req.flash('message', 'Error: ' + (e?.message ?? e));
    return res.redirect('/profile');
  }
}