import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import { USER_ROLE } from '../user/user.interfaces';
import createClient from './controllers/create';
import deleteClient from './controllers/delete';
import getClient from './controllers/get_all';
import getSingleClient from './controllers/get_by_id';
import updateClient from './controllers/update';

const router = express.Router();

// condition = clientTheyCreated;
// who can create client ? superadmin, reseller
// who can get all clients? only superadmin and ${condition}
// who can delete client by Id ? only superadmin and ${condition}
// who can update client by Id ? only superadmin and ${condition}

router.post('/', checkAuth(USER_ROLE.SUPERADMIN, USER_ROLE.RESELLER), createClient);
router.get('/', checkAuth(USER_ROLE.SUPERADMIN, USER_ROLE.RESELLER), getClient);
router.get('/:id', checkAuth(USER_ROLE.SUPERADMIN, USER_ROLE.RESELLER), getSingleClient);
router.put('/:id', checkAuth(USER_ROLE.SUPERADMIN, USER_ROLE.RESELLER), updateClient);
router.delete('/:id', checkAuth(USER_ROLE.SUPERADMIN, USER_ROLE.RESELLER), deleteClient);

export default router;
