import mongoose from 'mongoose';

const payeeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsccode: { type: String, required: true },
  payeeId: { type: String, required: true, unique: true },
  payeeType: { type: String, required: true },
  agentId: { type: String, required: false }, 
  agentName: { type: String, required: false }, 
  mobileNumber: { type: String, required: true }
}, { timestamps: true });

const Payee = mongoose.model('Payee', payeeSchema);

export default Payee;