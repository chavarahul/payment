import Payee from '../models/payee.model.js';

export const addPayee = async (req, res) => {
  try {
    const payeeData = req.body;
    const existingPayee = await Payee.findOne({ payeeId: payeeData.payeeId });
    if (existingPayee) {
      return res.status(400).json({ Result: 0, Message: 'Payee ID already exists' });
    }
    const payee = new Payee(payeeData);
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
    const payee = await Payee.findOneAndUpdate(
      { payeeId: payeeData.payeeId },
      payeeData,
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