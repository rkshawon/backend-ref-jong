import ApiError from '../../../errors/errors.apiError';
import { IClient } from '../client/client.interface';
import ClientModel from '../client/client.model';
import { IUser } from '../user/user.interfaces';
import UserModel from '../user/user.model';

const createClient = async (client: IClient): Promise<IClient | null> => {
  try {
    const createdClient = await ClientModel.create(client);
    if (!createdClient) {
      throw new ApiError(400, 'Failed to create client');
    }
    return createdClient;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

const createUser = async (user: IUser): Promise<IUser | null> => {
  try {
    const createdUser = await UserModel.create(user);
    if (!createdUser) {
      throw new Error('Failed to create user');
    }
    return createdUser;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

export { createClient, createUser };
