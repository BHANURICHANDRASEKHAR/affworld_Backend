import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Database_Models/User.js";

const router = express.Router();

router.get('/login', async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await User.findOne({ email,authtype:'manual'});
    if (!user) {
      return res.status(201).send({ status: false, msg: 'User not found' }); 
    }
    const is_password_valid = await bcrypt.compare(password, user.password);
    if (!is_password_valid) {
      return res.status(201).send({ status: false, msg: 'Invalid password' });  
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1y' } 
    );

    res.send({
      status: true,
      token:token
    });

  } catch (e) {
    console.error(e.message); 
    res.status(500).send({ status: false, msg: 'Internal Server Error' });
  }
});

export default router;
