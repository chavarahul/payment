import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateSixDigitPin = () => {
    return Math.floor(Math.random() * 900000).toString();
}

const signUp = async (req, res) => {
    try {
        const { username, pin, confirmPin } = req.body;
        if (!username || !pin || !confirmPin) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (pin.length < 4) {
            return res.status(400).json({ success: false, message: 'Pin must be at least 4 characters' });
        }
        if (username.length < 3) {
            return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }
        const hashedPin = await bcrypt.hash(pin, 10);
        const sixDigitPin = generateSixDigitPin();
        const user = new User({
            username,
            pin: hashedPin,
            uniquePin: sixDigitPin
        });
        await user.save();
        res.json({ success: true, userId: sixDigitPin });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });

    }
}

const login = async (req, res) => {
    try {
        const { uniquePin, pin , username } = req.body;
        console.log(uniquePin,pin);
        if (!uniquePin || !pin) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(pin, user.pin);
        if (!user || !isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({
            username: user.username, userId: user._id.toString()
        }, 'rahul121', { expiresIn: '48h' });

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export {
    signUp,
    login
}