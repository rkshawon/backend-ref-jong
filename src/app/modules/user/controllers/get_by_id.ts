import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../../errors/errors.apiError';
import catchAsync from '../../../../shared/HOF/catchAsync';
import sendResponse from '../../../../shared/utilities/sendResponse';
import { USER_ROLE } from '../user.interfaces';
import UserModel from '../user.model';
import checkPermission from './utils/checkPermission';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (user?.role !== USER_ROLE.SUPERADMIN) {
    const hasPermission = await checkPermission(user?.userId, id);
    if (!hasPermission) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Unauthorized Access');
    }
  }
  const userData = await UserModel.findById(id).populate('client').lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { client, ...info } = userData;
  const data = {
    client,
    user: info,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'success',
    data,
  });
});

export default getSingleUser;
