import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../../errors/errors.apiError';
import catchAsync from '../../../../shared/HOF/catchAsync';
import sendResponse from '../../../../shared/utilities/sendResponse';
import { USER_ROLE } from '../../user/user.interfaces';
import UserModel from '../../user/user.model';
import ClientModel from '../client.model';
import checkPermission from '../utils/checkPermission';

const deleteClient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = req?.user;

  if (user && user.role !== USER_ROLE.SUPERADMIN) {
    const hasPermission = await checkPermission(user?.userId, id);
    if (!hasPermission) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Unauthorized');
    }
  }
  const userData = await UserModel.findById(id).select('client');
  const data = await ClientModel.findByIdAndDelete(userData?.client);

  if (!data) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Data not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'success',
  });
});

export default deleteClient;
