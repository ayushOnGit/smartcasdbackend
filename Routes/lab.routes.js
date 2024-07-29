import { createLab, getLabs, getLab, updateLab, deleteLab, addUser, deleteUser, labLogin, updatePassword } from '../Controllers/lab.controllers.js';
import express from 'express';
const router = express.Router();

router.get('/getLabs', getLabs);
router.post('/createLabs', createLab);
router.get('/get/:id', getLab);
router.patch('/update/:id', updateLab);
router.delete('/delete/:id', deleteLab);

router.patch('/addUser/:id', addUser);
router.patch('/deleteUser/:id', deleteUser);

router.post('/login', labLogin);
router.patch('/updatePassword', updatePassword);

export default router;