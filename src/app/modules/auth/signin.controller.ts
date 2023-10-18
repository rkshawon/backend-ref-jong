import bcrypt from 'bcrypt';
import { CookieOptions, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/HOF/catchAsync';
import { jwtHelpers } from '../../../shared/helpers/jwtHelpers';
import sendResponse from '../../../shared/utilities/sendResponse';
import UserModel from '../user/user.model';

const signIn = catchAsync(async (req: Request, res: Response) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  })
    .populate('client')
    .lean();

  if (!user) {
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'User not found',
    });
  }
  const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordMatched) {
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Invalid Password',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, client, ...data } = user;

  const { _id, role } = data;

  const accessToken = jwtHelpers.createToken(
    { userId: _id, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: _id, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  const cookieOptions: CookieOptions = {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  const resp = {
    user: data,
    client,
    accessToken,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Signin successfully',
    data: resp,
  });
});

export default signIn;
