import express from 'express';
import checkAuth from '../../middlewares/checkAuth';
import createUser from './controllers/create';
import deleteUser from './controllers/delete';
import getUsers from './controllers/get_all';
import getSingleUser from './controllers/get_by_id';
import setPassword from './controllers/set_password';
import updateUser from './controllers/update';

const router = express.Router();

// condition = their client id;

// who can create user ? all role.
// who can get all users? only superadmin and others user can get all users by ${condition}
// who can get user by id? only superadmin and others user if the user's clientId they want to get is matched by ${condition}
// who can update user by id? only superadmin and others user if the user's clientId they want to update is matched by ${condition}
// who can delete user by id? only superadmin and others user if the user's clientId they want to delete is matched by ${condition}


router.post('/', checkAuth(), createUser); 
router.get('/', checkAuth(), getUsers);
router.get('/:id', checkAuth(), getSingleUser);
router.put('/:id', checkAuth(), updateUser); 
router.delete('/:id', checkAuth(), deleteUser); 
router.patch('/set-password', setPassword); 

export default router;
