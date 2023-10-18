import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../../config';
import catchAsync from '../../../../shared/HOF/catchAsync';
import { jwtHelpers } from '../../../../shared/helpers/jwtHelpers';
import sendResponse from '../../../../shared/utilities/sendResponse';
import sendEmail from '../../../services/mail';
import UserModel from '../user.model';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserModel.create(req.body);

  const setPasswordToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwt.secret,
    config.jwt.set_password_expires_in
  );

  sendEmail(
    user.email,
    {
      subject: `Congratulations! Your account has been created`,
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        token: config.jwt.client_port + '/set-password/' + setPasswordToken,
      },
    },
    'account_created'
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

export default createUser;
