import express from 'express';
import { addPayee, deletePayee, getPayees, updatePayee } from '../controllers/payee.controller.js';

const router = express.Router();

router.post('/addPayee', addPayee);
router.get('/getPayees', getPayees);
router.put('/updatePayee', updatePayee);
router.delete('/deletePayee', deletePayee);

export default router;