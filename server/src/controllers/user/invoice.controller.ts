import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { invoiceSvcs } from '../../services';
import { IRep, IRepDet } from '../../interfaces';
import { getTokenData } from '../../utils';

class InvoiceCtrl {
  /**
   * Create an invoice.
   * @method post
   */
  public createInvoice = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const newReg: IRep = req.body;
      // check if report_details is an array
      if (!Array.isArray(newReg.report_details)) {
        return res.status(400).json('report_details needs to be an array');
      }
      // starts
      await invoiceSvcs.createInvoice(profile, newReg);
      return res.status(200).json(`Invoicing done!`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all invoices.
   * @method get
   */
  public getInvoices = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const invoicesData: QueryResult = await invoiceSvcs.getInvoices(profile);
      const invoices = invoicesData.rows;
      return res.status(200).json(invoices);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get invoice detail by header id.
   * @method get
   */
  public getInvoiceDetailById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const invoiceDetailData: QueryResult =
        await invoiceSvcs.getInvoiceDetailById(profile, id);
      const invoiceDetail = invoiceDetailData.rows;
      return res.status(200).json(invoiceDetail);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific invoice.
   * @method get
   */
  public getInvoiceById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // get report master
      const reportMasterData: QueryResult =
        await invoiceSvcs.getInvoiceHeaderById(profile, id);
      const reportMaster: IRep = reportMasterData.rows[0];
      if (reportMaster) {
        // get report details
        const reportDetailsData: QueryResult =
          await invoiceSvcs.getInvoiceDetailsById(profile, id);
        const reportDetails: IRepDet[] = reportDetailsData.rows;
        // joining
        reportMaster.report_details = reportDetails;
      }
      return res.status(200).json(reportMaster);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get articles to distribute.
   * @method post
   */
  public getArticlesToDistribute = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const articlesToDistributeData: QueryResult =
        await invoiceSvcs.getArticlesToDistribute(profile, dateFrom, dateTo);
      const articlesToDistribute = articlesToDistributeData.rows;
      return res.status(200).json(articlesToDistribute);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update an invoice.
   * @method put
   */
  public updateInvoiceById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const invoiceData: IRep = req.body;
      await invoiceSvcs.updateInvoiceById(profile, id, invoiceData);
      return res.status(200).json(`Invoice ${id} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * delete an invoice.
   * @method delete
   */
  public deleteInvoiceById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await invoiceSvcs.deleteInvoiceById(profile, id);
      return res.status(200).json(`Invoice ${id} successfully deleted`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const invoiceCtrl = new InvoiceCtrl();
