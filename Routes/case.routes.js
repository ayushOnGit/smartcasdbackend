import   { createCase,updateQC, getCases,updateRPDFramework,updateCustomTray,getCase, updateCase, deleteCase, sendMesage, approveCase, getApprovedCases, getPendingCases, getCompletedCases, getShippedCases, updateTAT, updateStatus, updateDesignApproval, updateDestination, updateMessage, AddTeethData,updateDesignerName,getCasesByLabName } from '../controllers/case.controllers.js';
import express from 'express';
const router = express.Router();

router.post('/create', createCase);
router.get('/get', getCases);
router.get('/getcase',getCasesByLabName);
// router.get('/get', getCases);
router.get('/get/:caseID', getCase);
router.put('/update/:caseID', updateCase);
router.delete('/delete/:caseID', deleteCase);
router.post('/sendmessage/:caseID', sendMesage);
router.put('/approve/:caseID', approveCase);
router.get('/getapproved', getApprovedCases);
router.get('/getpending', getPendingCases);
router.get('/getcompleted', getCompletedCases);
router.get('/getshipped', getShippedCases);
router.put('/updatetat/:caseID', updateTAT);
router.put('/updatestatus/:caseID', updateStatus);
router.put('/updatedesignapproval/:caseID', updateDesignApproval);
router.put('/updatedestination/:caseID', updateDestination);
router.put('/updatemessage/:caseID', updateMessage);
router.put('/addteethdata/:caseID', AddTeethData);
router.patch('/designer',updateDesignerName);
router.put('/updateRPDFramework/:caseID', updateRPDFramework); //update RPD Framework of a case
router.put('/updateCustomTray/:caseID', updateCustomTray);
router.patch('/qcchange/:caseID',updateQC);

export default router;