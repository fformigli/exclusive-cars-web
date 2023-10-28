import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { WorkOrder } from "@prisma/client";
import { validateWorkOrderReferenceId } from "../lib/prisma/utils";
import { BUDGET_STATES } from "../lib/constants/general";
import { getCombosFromTranslateConstants } from "../lib/constants/functions";
import { BUDGET_STATES_TRANSLATE } from "../lib/constants/translate";
import { IDataForm } from "../lib/types";

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

  if (!budget) {
    // create an empty budget
    await prisma.budget.create({
      data: {
        WorkOrder: {
          connect: { id: workOrder.id }
        },
        Client: {
          connect: { id: workOrder.clientId }
        },
        CreatedBy: {
          connect: {
            id: userId
          }
        },
        state: BUDGET_STATES.PENDING
      }
    })
    budget = await getLatestBudget(workOrder)
  }

  return budget
}

export const getLatestBudget = async (workOrder: WorkOrder) => {
  let [budget] = await prisma.budget.findMany({
    where: { workOrderId: workOrder.id },
    orderBy: { id: 'desc' },
    include: { Client: { include: { User: true } } }
  })

  return budget
}
