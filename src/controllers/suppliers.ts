import { Request, Response } from "express"
import prisma from "../lib/prisma";
import {
  validateReferenceNameAlreadyExists,
  validateSupplierReferenceId
} from "../lib/prisma/utils";
import { getQueryString } from "../lib/helpers";

export const suppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany()

    res.render('suppliers/list.hbs', { suppliers })
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`financial-management`);
  }
}

export const getSupplierForm = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)
    const dataForm: any = {
      cancelPath: '/suppliers'
    }

    if (id) { // estamos editando
      dataForm.supplier = await validateSupplierReferenceId(id)
    }

    return res.render('suppliers/form', dataForm)
  } catch (e: any) {
    console.log(e)
    req.flash('message', 'Error: ' + e.message);
    return res.redirect('/suppliers');
  }
}

export const createSupplier = async (req: Request, res: Response) => {
  try {
    let { name, description, phoneNumber, address, otherContactInfo, ruc } = req.body

    await validateReferenceNameAlreadyExists(prisma.supplier, { name }, 'un proveedor', 'este nombre')
    await validateReferenceNameAlreadyExists(prisma.supplier, { ruc }, 'un proveedor', 'este RUC')


    await prisma.supplier.create({
      data: {
        name,
        description,
        phoneNumber,
        address,
        otherContactInfo,
        ruc
      }
    })

    req.flash('success', 'Se agregó el proveedor exitosamente!')
    return res.redirect('/suppliers')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/suppliers/add?${query}`);
  }
}

export const getSuppliersCombo = async () => {
  return await prisma.supplier.findMany({
    select: { id: true, name: true}
  })
}