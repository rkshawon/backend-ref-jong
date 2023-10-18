import ClientModel from '../client.model';

export default async function checkPermission(userId: string, paramsId: string) {
  const requestedUserCreatedBy = await ClientModel.findById(userId).select('createdBy');
  const paramsUserCreatedBy = await ClientModel.findById(paramsId).select('createdBy');
  return requestedUserCreatedBy?.createdBy === paramsUserCreatedBy?.createdBy;
}
