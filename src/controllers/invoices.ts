import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getSuppliersCombo } from "./suppliers";
import dayjs from "dayjs";

export const purchaseInvoices = async (req: Request, res: Response)=> {
  try {
    const invoices = await prisma.purchaseInvoice.findMany()

    res.render('invoices/purchaseList.hbs', { invoices })
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`financial-management`);
  }
}

export const getPurchaseForm = async (req: Request, res: Response)=> {
  try {
    const dataForm: any = {
      suppliers: await getSuppliersCombo(),
      currentDate: dayjs()
    }

    res.render('invoices/purchaseForm.hbs', dataForm)
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`/purchase-invoices`);
  }
}

