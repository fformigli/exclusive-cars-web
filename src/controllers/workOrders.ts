import { Request, Response } from "express";
import { Client, Configuration, User, WorkOrder } from "@prisma/client";
import { getEmployees } from "./users";
import { IDataForm, IWorkOrderState } from "../lib/types";
import { WORK_ORDER_STATE_TRANSLATE } from "../lib/constants/translate";
import prisma from "../lib/prisma";
import { getFuelLevels } from "./configurations";
import { getClientList } from "./clients";

// const fs = require('fs');
// const path = require('path');

interface IWorkOrderDataForm extends IDataForm {
  workOrderStates: IWorkOrderState[],
  employees: User[],
  fuelStates: Configuration[],
  clients: Client[]
}

interface IWorkOrderListDataForm {
  employees: User[],
  workOrderStates: IWorkOrderState[]
  filter?: any
  workOrders?: WorkOrder[]
}

async function chargeFormCombos(): Promise<IWorkOrderDataForm> {
  const workOrderStates: IWorkOrderState[] = getWorkOrderStates()
  const employees: User[] = await getEmployees()
  const fuelStates: Configuration[] = await getFuelLevels()
  const clients: Client[] = await getClientList()


  return {
    workOrderStates,
    employees,
    fuelStates,
    clients,
    cancelPath: '/work-orders'
  }
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
    console.log(dataForm.filter)

    dataForm.workOrders = await prisma.workOrder.findMany({
      orderBy: {
        id: 'desc'
      }
    })

    return res.render('work-orders/list.hbs', dataForm);
  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + err.message);
    return res.redirect('/profile');
  }
};

//
export const createWorkOrderForm = async (req: Request, res: Response) => {
  try {
    const dataForm: IWorkOrderDataForm  = await chargeFormCombos();

    return res.render('work-orders/form.hbs', dataForm);
  } catch (err: any) {
    console.error(err);
    req.flash('message', 'Error: ' + err.message);
    return res.redirect('/profile');
  }
};
//
// export const saveNew = async (req: Request, res: Response) => {
//   const {
//     cliente,
//     vehiculo,
//     encargado,
//     status,
//     telefono,
//     vinnro,
//     combustible,
//     chapa,
//     recorrido,
//     description
//   } = req.body;
//
//   // intentamos crear la orden
//   try {
//     // creamos la orden de trabajo
//     const sql = 'insert into work_orders '
//       + '(cliente, vehiculo, encargado, statusid, fuelid, telefono, chapa, vinnro, recorrido, description, created_by) '
//       + 'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning id';
//
//     const wo = await pool.query(sql, [cliente, vehiculo, encargado, status, combustible, telefono, chapa, vinnro, recorrido, description, req.user.id]);
//
//     // si tiene archivos, agregamos
//     if (req.file) {
//       var ext = path.extname(req.file.originalname).toLowerCase();
//       let filetype = 'img';
//       if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg')
//         filetype = 'video';
//
//       await pool.query('insert into work_order_files (work_order, filename, filetype) values ($1, $2, $3)', [wo.rows[0].id, req.file.filename, filetype]);
//     }
//
//     req.flash('success', 'Se agregó la orden');
//     res.redirect('/work-orders');
//
//   } catch (err: any) {
//     console.error(err);
//     req.flash('message', 'Error: ' + err.message);
//     res.redirect('/work-orders/add');
//   }
// };
//
// export const edit = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const dataForm: any = await chargeCombos();
//
//   try {
//     // obtenemos el wo
//     const wo = await pool.query('select * from work_orders where id = $1', [id]);
//     dataForm.wo = wo.rows[0];
//
//     const wof = await pool.query('select * from work_order_files where work_order = $1 order by id', [id]);
//     dataForm.wof = wof.rows;
//
//     const woc = await pool.query('select c.comment, u.fullname as created_by, c.created_at from work_order_comments c, users u where work_order = $1 and c.created_by = u.id order by c.id', [id]);
//     dataForm.woc = woc.rows;
//
//     res.render('work-orders/form.hbs', dataForm);
//
//   } catch (err: any) {
//     console.error(err);
//     req.flash('message', 'Error: ' + err.message);
//     res.redirect('/work-orders');
//   }
// };
//
// export const saveUpdate = async (req: Request, res: Response) => {
//   const {
//     cliente,
//     vehiculo,
//     encargado,
//     status,
//     telefono,
//     vinnro,
//     combustible,
//     chapa,
//     recorrido,
//     description
//   } = req.body;
//   const { id } = req.params;
//
//   console.log(description);
//
//   try {
//     // actualizamos la orden de trabajo
//     const sql = 'update work_orders'
//       + ' set cliente = $1, vehiculo = $2, encargado = $3, statusid = $4, fuelid = $5, telefono = $6, chapa = $7, vinnro = $8,'
//       + ' recorrido = $9, description = $10'
//       + ' where  id = $11';
//
//     await pool.query(sql, [cliente, vehiculo, encargado, status, combustible, telefono, chapa, vinnro, recorrido, description, id]);
//
//     // si tiene archivos, agregamos
//     if (req.file) {
//       var ext = path.extname(req.file.originalname).toLowerCase();
//       let filetype = 'unknown';
//       if (ext == '.png' || ext == '.jpg' || ext == '.gif' || ext == '.jpeg')
//         filetype = 'img';
//       if (ext == '.avi' || ext == '.mp4' || ext == '.wmv' || ext == '.wma')
//         filetype = 'video';
//
//       await pool.query('insert into work_order_files (work_order, filename, filetype) values ($1, $2, $3)', [id, req.file.filename, filetype]);
//     }
//
//     req.flash('success', 'Se actualizó la orden');
//
//   } catch (err: any) {
//     console.error(err);
//     req.flash('message', 'Error: ' + err.message);
//   }
//   res.redirect('/work-orders/edit/' + id);
// };
//
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
//
// export const addComment = async (req: Request, res: Response) => {
//   const { wo } = req.params
//   const { comment } = req.body
//
//   try {
//     await pool.query('insert into work_order_comments (work_order, comment, created_by) ' +
//       'values ($1, $2, $3)', [wo, comment, req.user.id])
//
//     req.flash('success', 'Comentario agregado');
//
//   } catch (err: any) {
//     console.error(err)
//     req.flash('message', 'Error: ' + err.message)
//   }
//   res.redirect('/work-orders/edit/' + wo);
// };