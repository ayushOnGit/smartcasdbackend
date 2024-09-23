import { getAllUsersController,updateUserRoleController } from '../Controllers/user.controller.js'; // Destructure here

import express from 'express';
const router = express.Router();

router.get('/users', getAllUsersController);
router.patch('/users/:userId', updateUserRoleController);

export default router;
