import { pool } from '../../database';
import { QueryResult } from 'pg';
import { IRep, IRepDet } from '../../interfaces';

class InvoiceSvcs {
  /**
   * Create a Invoice.
   * @param profile schema name
   * @param newReg invoice data
   */
  public createInvoice = async (
    profile: string,
    newReg: IRep
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Creating a Invoice.
      const invoiceQuery = `INSERT INTO report_master (
        client_id,
        user_id,
        sale_type_id,
        payment_type_id,
        created,
        fee_percentage,
        total,
        payment,
        debt
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
      const invoiceData = [
        newReg.client_id,
        newReg.user_id,
        newReg.sale_type_id,
        newReg.payment_type_id,
        newReg.created,
        newReg.fee_percentageTotal,
        newReg.total,
        newReg.payment,
        newReg.debt,
      ];
      // insert the invoice and return its Id
      const respones: QueryResult = await client.query(
        invoiceQuery,
        invoiceData
      );
      const invoiceId: number = respones.rows[0].id;

      // Creating a report_detail register.
      const invoiceDetails: Array<IRepDet> = newReg.report_details;
      // starts iteration for each report_detail given
      invoiceDetails.forEach(async (detail) => {
        // adding product to invoice
        const invoiceDetailQuery = `INSERT INTO report_detail ( 
            report_master_id,
            product_id,
            amount,
            units,
            unit_price,
            fee_percentage,
            subtotal
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const invoiceDetailData = [
          invoiceId,
          detail.product_id,
          detail.amount,
          detail.units,
          detail.unit_price,
          detail.fee_percentage,
          detail.subtotal,
        ];
        await client.query(invoiceDetailQuery, invoiceDetailData);
        // Updating stock from products table.
        const productStockQuery = `UPDATE products SET stock = 
          (CASE 
            WHEN (stock - $1) <= 0 THEN 0
            WHEN (stock - $1) > 0 THEN (stock - $1) 
          END)
        WHERE id = $2;`;
        const productStockData = [detail.units, detail.product_id];
        await client.query(productStockQuery, productStockData);
      });

      // Creating a checking_account register if needed.
      if (newReg.debt > 0) {
        // getting client debt
        const clientPreviousDebtData = await client.query(
          `SELECT debt FROM clients WHERE id = $1;`,
          [newReg.client_id]
        );
        const clientPreviousDebt = clientPreviousDebtData.rows[0];
        // creating...
        const checkingAccQuery = `INSERT INTO checking_accounts ( 
        client_id,
        report_master_id,
        created,
        previous_debt,
        movement
      ) VALUES ($1, $2, $3, $4, $5)`;
        const checkingAccData = [
          newReg.client_id,
          invoiceId,
          newReg.created,
          clientPreviousDebt.debt,
          newReg.debt,
        ];
        await client.query(checkingAccQuery, checkingAccData);
      }

      // Update client debt.
      if (newReg.debt) {
        const updateDebtQuery = `UPDATE clients SET debt = (debt + $1) WHERE id = $2;`;
        const updateDebtData = [newReg.debt, newReg.client_id];
        await client.query(updateDebtQuery, updateDebtData);
      }

      // End transaction.
      await client.query('COMMIT');
      await client.query(`SET search_path TO public;`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };

  /**
   * Get all invoices header.
   * @param profile schema name
   */
  public getInvoices = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.report_master`);
  };

  /**
   * Get invoice detail by header id.
   * @param profile schema name
   * @param id report_master id
   */
  public getInvoiceDetailById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.report_detail WHERE report_master_id = $1`,
      [id]
    );
  };

  /**
   * Get a specific invoice header.
   * @param profile schema name
   * @param id report_master id
   */
  public getInvoiceHeaderById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.report_master WHERE id = $1`,
      [id]
    );
  };

  /**
   * Get invoice details.
   * @param profile schema name
   * @param id report_master id
   */
  public getInvoiceDetailsById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT rd.* FROM ${profile}.report_detail AS rd 
      INNER JOIN ${profile}.report_master AS rm ON rm.id = rd.report_master_id
      WHERE rm.id = $1`,
      [id]
    );
  };

  /**
   *Get articles to distribute.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getArticlesToDistribute = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT rd.product_id, sum(rd.amount) as "amount", sum(rd.units) as "units"
        FROM ${profile}.report_detail AS rd 
        INNER JOIN coki.report_master AS rm ON rd.report_master_id = rm.id
        WHERE rm.created >= $1 AND rm.created <= $2
	    GROUP BY rd.product_id`,
      [dateFrom, dateTo]
    );
  };

  /**
   * Update a Invoice.
   * @param profile schema name
   * @param id invoice id
   * @param invoiceData invoice data
   */
  public updateInvoiceById = async (
    profile: string,
    id: number,
    invoiceData: IRep
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Updating a Invoice.
      const reportQuery = `UPDATE report_master SET (
        client_id,
        user_id,
        sale_type_id,
        payment_type_id,
        created,
        fee_percentage,
        total,
        payment,
        debt
      ) = ($1, $2, $3, $4, $5, $6, $7, $8, $9) WHERE id = $10`;
      const reportData = [
        invoiceData.client_id,
        invoiceData.user_id,
        invoiceData.sale_type_id,
        invoiceData.payment_type_id,
        invoiceData.created,
        invoiceData.fee_percentageTotal,
        invoiceData.total,
        invoiceData.payment,
        invoiceData.debt,
        id,
      ];
      // update the invoice
      await client.query(reportQuery, reportData);
      const invoiceId: number = id;

      // Deleting old 'report_detail' registers.
      await client.query(
        `DELETE FROM report_detail WHERE report_master_id = $1`,
        [invoiceId]
      );

      // Creating a new report_detail register.
      const invoiceDetails: Array<IRepDet> = invoiceData.report_details;
      // starts iteration for each report_detail given
      invoiceDetails.forEach(async (detail) => {
        const reportDetailQuery = `INSERT INTO report_detail ( 
            report_master_id,
            product_id,
            amount,
            units,
            unit_price,
            fee_percentage,
            subtotal
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const reportDetailData = [
          invoiceId,
          detail.product_id,
          detail.amount,
          detail.units,
          detail.unit_price,
          detail.fee_percentage,
          detail.subtotal,
        ];
        await client.query(reportDetailQuery, reportDetailData);
      });

      // Deleting old 'checking_accounts' registers.
      await client.query(
        `DELETE FROM checking_accounts WHERE report_master_id = $1`,
        [invoiceId]
      );

      // Creating a new checking_account register if needed.
      if (invoiceData.debt > 0) {
        // getting client debt
        const clientPreviousDebtData = await client.query(
          `SELECT debt FROM clients WHERE id = $1;`,
          [invoiceData.client_id]
        );
        const clientPreviousDebt = clientPreviousDebtData.rows[0];
        // creating...
        const checkingAccQuery = `INSERT INTO checking_accounts ( 
        client_id,
        report_master_id,
        created,
        previous_debt,
        movement
      ) VALUES ($1, $2, $3, $4, $5)`;
        const checkingAccData = [
          invoiceData.client_id,
          invoiceId,
          invoiceData.created,
          clientPreviousDebt.debt,
          invoiceData.debt,
        ];
        await client.query(checkingAccQuery, checkingAccData);
      }

      // Update client debt.
      await client.query(
        `UPDATE clients SET debt = (debt - $1 + $2) WHERE id = $3`,
        [invoiceData.old_debt, invoiceData.debt, invoiceData.client_id]
      );

      // End transaction.
      await client.query('COMMIT');
      await client.query(`SET search_path TO public;`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };

  /**
   * Delete a invoice.
   * @param profile schema name
   * @param id invoice id
   */
  public deleteInvoiceById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // getting report_master data
      const invoiceData = await client.query(
        `SELECT * FROM report_master WHERE id = $1;`,
        [id]
      );
      const invoice = invoiceData.rows[0];

      // deleting report_detail register
      await client.query(
        `DELETE FROM report_detail WHERE report_master_id = $1`,
        [id]
      );

      // deleting report_master register
      await client.query(`DELETE FROM report_master WHERE id = $1`, [id]);

      // update client debt
      await client.query(
        `UPDATE clients SET debt = (debt - $1) WHERE id = $2`,
        [invoice.debt, invoice.client_id]
      );

      // delete checking_account register
      await client.query(
        `DELETE FROM checking_accounts WHERE report_master_id = $1`,
        [id]
      );
      // End transaction.
      await client.query('COMMIT');
      await client.query(`SET search_path TO public;`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };
}

export const invoiceSvcs = new InvoiceSvcs();
