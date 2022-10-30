import { Response } from 'express';
import { logger } from '../libs';

/**
 * Default error message and Logger function.
 */
class ErrorMsg {
  public serverError(res: Response, e: Error | any) {
    logger.error(`${e.stack}, ${e.message}`);
    return res.status(500).json('Internal server error');
  }
}

export const errorMsg = new ErrorMsg();
