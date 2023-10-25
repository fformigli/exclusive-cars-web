import { Request, Response } from "express";
import { Client, Configuration, User, WorkOrder, WorkShopBranch } from "@prisma/client";
import { getEmployees } from "./users";
import { IDataForm, IWorkOrderState } from "../lib/types";
import { WORK_ORDER_STATE_TRANSLATE } from "../lib/constants/translate";
import prisma from "../lib/prisma";
import { getFuelLevels, getWorkShopBranches } from "./configurations";
import { getClientList } from "./clients";
import {
  validateClientReferenceId,
  validateConfigurationReferenceId,
  validateUserReferenceId,
  validateWorkOrderReferenceId, validateWorkShopBranchReferenceId
} from "../lib/prisma/utils";
import { getQueryString } from "../lib/helpers";

// import fs from 'fs';
// import path from 'path';

interface IWorkOrderDataForm extends IDataForm {
  workOrderStates: IWorkOrderState[],
  employees: User[],
  fuelStates: Configuration[],
  clients: Client[]
  branches: WorkShopBranch[]
  wo?: any
}

interface IWorkOrderListDataForm {
  employees: User[],
  workOrderStates: IWorkOrderState[]
  filter?: any
  workOrders?: WorkOrder[]
}

interface WorkOrderListItem extends WorkOrder {
  stateLabel?: string
}

async function chargeFormCombos(): Promise<IWorkOrderDataForm> {
  const workOrderStates: IWorkOrderState[] = getWorkOrderStates()
  const employees: User[] = await getEmployees()
  const fuelStates: Configuration[] = await getFuelLevels()
  const clients: Client[] = await getClientList()
  const branches: WorkShopBranch[] = await getWorkShopBranches()


  return {
    workOrderStates,
    employees,
    fuelStates,
    clients,
    branches,
    cancelPath: '/work-orders'
  }
}

const WORK_ORDER_DEFAULT_INCLUDES = {
  AssignedTo: true,
  Client: { include: { User: true } },
  FuelState: true,
  WorkOrderComments: { include: { CreatedBy: true } },
  WorkShopBranch: true

}

const getWorkOrderStates = () => Object.entries(WORK_ORDER_STATE_TRANSLATE).reduce((wo: any, s: [string, string]) => {
  wo.push({
    value: s[0],
    label: s[1]
  })
  return wo
}, [])

const getListCombos = async (): Promise<IWorkOrderListDataForm> => {
  const employees: User[] = await getEmployees()
  const workOrderStates: IWorkOrderState[] = getWorkOrderStates()

  return {
    employees,
    workOrderStates
  }
}


export const list = async (req: Request, res: Response) => {
  try {
    let dataForm: IWorkOrderListDataForm = await getListCombos();
    dataForm.filter = req.query

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

    if (req.query?.assignedTo) {
      where.AssignedTo = {
        id: +req.query.assignedTo
      }
    }

    if (req.query?.state) {
      where.state = +req.query.state
    }
    console.log(JSON.stringify({ where }, null, 2))

    dataForm.workOrders = await prisma.workOrder.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        AssignedTo: true,
        Client: {
          include: {
            User: true
          }
        }
      },
      where
    })

    // traducimos
    dataForm.workOrders?.forEach((wo: WorkOrderListItem) => {
      wo.stateLabel = WORK_ORDER_STATE_TRANSLATE[wo.state] ?? wo.state
    })

    return res.render('work-orders/list.hbs', dataForm);
  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + err.message);
    return res.redirect('/profile');
  }
};

export const createWorkOrderForm = async (req: Request, res: Response) => {
  try {
    const dataForm: IWorkOrderDataForm = await chargeFormCombos();

    return res.render('work-orders/form.hbs', dataForm);
  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + err.message);
    return res.redirect('/profile');
  }
};

export const createWorkOrder = async (req: Request, res: Response) => {
  const {
    clientId,
    vehicleInformation,
    assignedToId,
    state,
    contactPhone,
    vinNumber,
    fuelStateId,
    plate,
    mileage,
    description,
    workShopBranchId
  } = req.body;

  try {
    // creamos la orden de trabajo
    const client = await validateClientReferenceId(+clientId)
    const assignedTo: User = await validateUserReferenceId(+assignedToId, { WorkShopBranch: true })
    const fuelState: Configuration = await validateConfigurationReferenceId(+fuelStateId)
    const workShopBranch: WorkShopBranch = await validateWorkShopBranchReferenceId(+workShopBranchId)

    if(assignedTo.workShopBranchId !== workShopBranch.id) {
      throw 'El encargado no es de la sucursal seleccionada'
    }

    const wo = await prisma.workOrder.create({
      data: {
        vehicleInformation,
        state: +state,
        contactPhone,
        vinNumber,
        plate,
        mileage: +mileage,
        description,
        Client: {
          connect: {
            id: client.id
          }
        },
        AssignedTo: {
          connect: {
            id: assignedTo.id
          }
        },
        FuelState: {
          connect: {
            id: fuelState.id
          }
        },
        CreatedBy: {
          connect: {
            id: req.user.id
          }
        },
        WorkShopBranch: {
          connect: {
            id: workShopBranch.id
          }
        }
      }
    })

    // si tiene archivos, agregamos
    // if (req.file) {
    //   const ext = path.extname(req.file.originalname).toLowerCase();
    //   let filetype = 'img';
    //   if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg')
    //     filetype = 'video';
    //
    //   // await pool.query('insert into work_order_files (work_order, filename, filetype) values ($1, $2, $3)', [wo.rows[0].id, req.file.filename, filetype]);
    // }

    req.flash('success', 'Se agregó la orden');
    res.redirect(`/work-orders/edit/${wo.id}`);

  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + (err.message || err));
    const query = getQueryString(req.body)

    console.log({ query })

    res.redirect(`/work-orders/add?${query}`);
  }
};

export const editWorkOrderForm = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params?.id, 10)

    const dataForm: IWorkOrderDataForm = await chargeFormCombos();
    dataForm.wo = await validateWorkOrderReferenceId(id, WORK_ORDER_DEFAULT_INCLUDES)
    console.log(dataForm.wo)

    res.render('work-orders/form.hbs', dataForm);
  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + err.message);
    res.redirect('/work-orders');
  }
};


export const updateWorkOrder = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)
  const {
    clientId,
    vehicleInformation,
    assignedToId,
    state,
    contactPhone,
    vinNumber,
    fuelStateId,
    plate,
    mileage,
    description,
    workShopBranchId
  } = req?.body || {}

  try {
    await validateWorkOrderReferenceId(id)
    const client = await validateClientReferenceId(+clientId)
    const assignedTo: User = await validateUserReferenceId(+assignedToId)
    const fuelState: Configuration = await validateConfigurationReferenceId(+fuelStateId)
    const workShopBranch: WorkShopBranch = await validateWorkShopBranchReferenceId(+workShopBranchId)

    if(assignedTo.workShopBranchId !== workShopBranch.id) {
      throw 'El encargado no es de la sucursal seleccionada'
    }

    await prisma.workOrder.update({
      where: { id },
      data: {
        vehicleInformation,
        state: +state,
        contactPhone,
        vinNumber,
        plate,
        mileage: +mileage,
        description,
        Client: {
          connect: {
            id: client.id
          }
        },
        AssignedTo: {
          connect: {
            id: assignedTo.id
          }
        },
        FuelState: {
          connect: {
            id: fuelState.id
          }
        },
        WorkShopBranch: {
          connect: {
            id: workShopBranch.id
          }
        }
      }
    })

    req.flash('success', 'Se modificó la orden');
    res.redirect(`/work-orders/edit/${id}`);

  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/work-orders/edit/${id}?${query}`);
  }
}

// export const deleteFiles = async (req: Request, res: Response) => {
//   const { wo, id } = req.params;
//
//   try {
//     const wof = await pool.query('select * from work_order_files where id = $1', [id]);
//     await pool.query('delete from work_order_files where id = $1', [id]);
//     fs.unlink(path.join(__dirname, '../public/uploads/' + wof.rows[0].filename), (err: any) => {
//       if (err) {
//         console.error(err);
//         throw "No se pudo eliminar el archivo; " + err.message;
//       }
//     });
//     req.flash('success', 'se elimino el archivo');
//   } catch (err: any) {
//     console.error(err);
//     req.flash('message', 'Error: ' + err.message);
//   }
//
//   res.redirect('/work-orders/edit/' + wo);
//
// };

export const addComment = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)
  const { comment } = req.body

  try {
    if (!comment) {
      throw 'El comentario no puede estar vacío'
    }

    await validateWorkOrderReferenceId(id, WORK_ORDER_DEFAULT_INCLUDES)

    await prisma.workOrderComment.create({
      data: {
        WorkOrder: {
          connect: {
            id
          }
        },
        comment,
        CreatedBy: {
          connect: {
            id: req.user.id
          }
        }
      }
    })


    req.flash('success', 'Comentario agregado');
    res.redirect(`/work-orders/edit/${id}`);
  } catch (err: any) {
    console.error(err)
    const query = getQueryString(req.body)
    req.flash('message', 'Error: ' + err.message)
    res.redirect(`/work-orders/edit/${id}?${query}`);
  }
};