import { Request, Response } from "express";
import prisma from "../lib/prisma";

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

    res.render('invoices/purchaseForm.hbs')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`/purchase-invoices`);
  }
}

