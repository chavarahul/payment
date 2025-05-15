import express from 'express';
import { addPayee, deletePayee, getPayees, updatePayee, getAgents, getAgentById } from '../controllers/payee.controller.js';

const router = express.Router();

router.post('/addPayee', addPayee);
router.get('/getPayees', getPayees);
router.put('/updatePayee', updatePayee);
router.delete('/deletePayee', deletePayee);
router.get('/agents', getAgents);
router.get('/agents/:agentId', getAgentById);

export default router;