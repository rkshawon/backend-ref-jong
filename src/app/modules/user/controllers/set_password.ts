import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../../config';
import ApiError from '../../../../errors/errors.apiError';
import catchAsync from '../../../../shared/HOF/catchAsync';
import { jwtHelpers } from '../../../../shared/helpers/jwtHelpers';
import sendResponse from '../../../../shared/utilities/sendResponse';
import UserModel from '../user.model';

const setPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  
  const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret);

  if (!verifiedUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Invalid Token');
  }
  
  const data = {
    password,
    is_email_verified: true,
    status: 'active',
  };
  
  const userInfo = await UserModel.findByIdAndUpdate(verifiedUser?.userId, data, { new: true });
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success',
    data: userInfo,
  });
});

export default setPassword;
