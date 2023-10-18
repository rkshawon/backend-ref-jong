import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../../../shared/HOF/catchAsync';
import sendResponse from '../../../shared/utilities/sendResponse';
import sendEmail from '../../services/mail';
import ClientModel from '../client/client.model';
import UserModel from '../user/user.model';
import { createClient, createUser } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const { user, client } = req.body;

    const existingClient = await ClientModel.findOne({ email: client.email });

    if (existingClient) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'Client with this email already exists',
      });
    }

    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'User with this email already exists',
      });
    }

    const clientData = await createClient(client);
    if (clientData) {
      user.client = clientData._id;
    }

    await createUser(user);

    sendEmail(
      user.email,
      {
        subject: `Congratulations! Your account has been created`,
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
      'account_created'
    );

    await session.commitTransaction();
    session.endSession();

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Data created successfully',
    });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Counld not complete the signup',
      data: error,
    });
  }
});

export default signUp;
