import Payee from '../models/payee.model.js';
import Agent from '../models/agent.model.js'; 

export const addPayee = async (req, res) => {
  try {
    const payeeData = req.body;
    
    if (!payeeData.payeeId) {
      return res.status(400).json({ Result: 0, Message: 'Payee ID is required' });
    }

    const existingPayee = await Payee.findOne({ payeeId: payeeData.payeeId });
    if (existingPayee) {
      return res.status(400).json({ Result: 0, Message: 'Payee ID already exists' });
    }

    if (payeeData.agentId) {
      const agent = await Agent.findOne({ agentId: payeeData.agentId });
      if (!agent) {
        return res.status(404).json({ Result: 0, Message: 'Agent not found' });
      }
      if (payeeData.agentName && payeeData.agentName !== agent.agentName) {
        return res.status(400).json({ Result: 0, Message: 'Agent name does not match agent ID' });
      }
    }

    const payee = new Payee({
      ...payeeData,
      agentId: payeeData.agentId || null,
      agentName: payeeData.agentName || null
    });
    await payee.save();
    res.status(201).json({ Result: 8, Message: 'Payee Added Successfully' });
  } catch (error) {
    console.error('Error adding payee:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};

export const getPayees = async (req, res) => {
  try {
    const payees = await Payee.find();
    res.status(200).json({
      Result: 2,
      Message: '',
      Objresponse: payees
    });
  } catch (error) {
    console.error('Error fetching payees:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};

export const updatePayee = async (req, res) => {
  try {
    const payeeData = req.body;
    if (payeeData.agentId) {
      const agent = await Agent.findOne({ agentId: payeeData.agentId });
      if (!agent) {
        return res.status(404).json({ Result: 0, Message: 'Agent not found' });
      }
      if (payeeData.agentName && payeeData.agentName !== agent.agentName) {
        return res.status(400).json({ Result: 0, Message: 'Agent name does not match agent ID' });
      }
    }

    const payee = await Payee.findOneAndUpdate(
      { payeeId: payeeData.payeeId },
      {
        ...payeeData,
        agentId: payeeData.agentId || null,
        agentName: payeeData.agentName || null
      },
      { new: true }
    );
    if (!payee) {
      return res.status(404).json({ Result: 0, Message: 'Payee not found' });
    }
    res.status(200).json({ Result: 8, Message: 'Payee updated Successfully' });
  } catch (error) {
    console.error('Error updating payee:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};

export const deletePayee = async (req, res) => {
  try {
    const { payeeId } = req.body;
    if (!payeeId) {
      return res.status(400).json({ Result: 0, Message: 'Payee ID is required' });
    }
    const payee = await Payee.findOneAndDelete({ payeeId });
    if (!payee) {
      return res.status(404).json({ Result: 0, Message: 'Payee not found' });
    }
    res.status(200).json({ Result: 8, Message: 'Payee deleted Successfully' });
  } catch (error) {
    console.error('Error deleting payee:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find({}, 'agentId agentName');
    res.status(200).json({
      Result: 2,
      Message: '',
      Objresponse: agents
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const { agentId } = req.params;
    if (!agentId) {
      return res.status(400).json({ Result: 0, Message: 'Agent ID is required' });
    }
    const agent = await Agent.findOne({ agentId }, 'agentId agentName');
    if (!agent) {
      return res.status(404).json({ Result: 0, Message: 'Agent not found' });
    }
    res.status(200).json({
      Result: 2,
      Message: '',
      Objresponse: agent
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ Result: 0, Message: 'Internal Server Error' });
  }
};