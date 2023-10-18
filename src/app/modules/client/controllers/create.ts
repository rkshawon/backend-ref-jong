import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/HOF/catchAsync';
import sendResponse from '../../../../shared/utilities/sendResponse';
import ClientModel from '../client.model';

const createClient = catchAsync(async (req: Request, res: Response) => {
  const data = { ...req.body, createdBy: req.user?.userId };
  const user = await ClientModel.create(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'success',
    data: user,
  });
});

export default createClient;
