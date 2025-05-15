import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  agentId: { type: String, required: true, unique: true },
  agentName: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false }
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;