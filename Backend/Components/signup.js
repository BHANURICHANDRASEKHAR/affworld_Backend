import express from 'express';
import bcrypt from 'bcryptjs';
import User from "../Database_Models/User.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).send({ status: false, msg: 'User already exists' }); 
    }
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      email,
      password: hashedPassword, 
      username,
    });

    await newUser.save(); 

    res.send({
      status: true,
    });

  } catch (e) {
    console.error(e.message);
    res.status(500).send({ status: false, msg: 'Internal Server Error' });
  }
});

export default router;
