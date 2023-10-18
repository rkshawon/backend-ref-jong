import UserModel from '../modules/user/user.model';

const getallUserData = async (token, limit: number, skip: number) => {
  if (token.role === 'superadmin') {
    return await UserModel.find().skip(skip).limit(limit).lean();
  } else {
    const user = await UserModel.findById(token._id).lean();

    return await UserModel.find({ client: user?.client }).lean();
  }
};

export default getallUserData;
