import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../../errors/errors.apiError';
import catchAsync from '../../../../shared/HOF/catchAsync';
import sendResponse from '../../../../shared/utilities/sendResponse';
import { USER_ROLE } from '../../user/user.interfaces';
import UserModel from '../../user/user.model';
import ClientModel from '../client.model';
import checkPermission from '../utils/checkPermission';

const getSingleClient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = req?.user;

  if (user && user.role !== USER_ROLE.SUPERADMIN) {
    const hasPermission = await checkPermission(user?.userId, id);
    if (!hasPermission) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Unauthorized');
    }
  }
  const userData = await UserModel.findById(id).select('client');
  const data = await ClientModel.findById(userData?.client).lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not found');
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'success',
    data: data,
  });
});

export default getSingleClient;
