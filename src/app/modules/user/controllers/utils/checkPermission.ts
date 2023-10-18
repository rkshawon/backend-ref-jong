import UserModel from '../../user.model';

export default async function checkPermission(userId: string, paramsId: string) {
  const requestedUserclient = await UserModel.findById(userId).select('client');
  const reqPramsUserclient = await UserModel.findById(paramsId).select('client');
  return requestedUserclient?.client === reqPramsUserclient?.client;
}
