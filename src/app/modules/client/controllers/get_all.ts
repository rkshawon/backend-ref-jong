import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/HOF/catchAsync';
import { paginationFields } from '../../../../shared/constants/pagination.constants';
import { calculatePagination } from '../../../../shared/helpers/paginationHelper';
import pickKeys from '../../../../shared/utilities/pickKeys';
import sendResponse from '../../../../shared/utilities/sendResponse';
import { USER_ROLE } from '../../user/user.interfaces';
import ClientModel from '../client.model';

const getClient = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pickKeys(req.query, paginationFields);
  const { limit, page, skip, sort } = calculatePagination(paginationOptions);
  const user = req?.user;
  const userRole = req.user && req.user.role;
  const userclient = await ClientModel.findById(user?.userId).select('createdBy');
  const query = userRole === USER_ROLE.SUPERADMIN ? {} : { createdBy: userclient?.createdBy };

  const totalClients = await ClientModel.countDocuments(query);
  const clients = await ClientModel.find(query).sort(sort).skip(skip).limit(limit).lean();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'success',
    data: clients,
    meta: {
      total: totalClients,
      limit: limit,
      page: page,
    },
  });
});

export default getClient;
