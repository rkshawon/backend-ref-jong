import httpStatus from 'http-status';
import catchAsync from '../../../../shared/HOF/catchAsync';
import { paginationFields } from '../../../../shared/constants/pagination.constants';
import { calculatePagination } from '../../../../shared/helpers/paginationHelper';
import pickKeys from '../../../../shared/utilities/pickKeys';
import sendResponse from '../../../../shared/utilities/sendResponse';
import { USER_ROLE } from '../user.interfaces';
import UserModel from '../user.model';

const getUsers = catchAsync(async (req, res) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const { limit, page, skip, sort } = calculatePagination(paginationOptions);
  const userRole = req.user && req.user.role;

  const userclient = await UserModel.findById(req.user?.userId).select('client');
  const query = userRole === USER_ROLE.SUPERADMIN ? {} : { client: userclient?.client };

  const users = await UserModel.find(query).sort(sort).skip(skip).limit(limit);
  const totalUsers = await UserModel.countDocuments(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'success',
    data: users,
    meta: {
      total: totalUsers,
      limit: limit,
      page: page,
    },
  });
});

export default getUsers;
