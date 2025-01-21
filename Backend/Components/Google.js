import {OAuth2Client} from 'google-auth-library'
const client = new OAuth2Client(process.env.google_id);
import express from 'express';
import User from '../Database_Models/User.js';
import jwt from 'jsonwebtoken'
const app=express.Router();
async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.google_id,
  });
  const payload = ticket.getPayload();
  console.log(payload);
  return payload;
}
export default app.post('/auth/google', async (req, res) => {
  const token = req.body.token; 
  console.log('token');
  try {
    const userData = await verifyToken(token);
    const jwttoken = await googlelogin(userData);
    res.send({status:true, token:jwttoken});
  } catch (error) {
    res.status(400).send({msg: 'Invalid token',status:false});
  }
});
async function googlelogin(data) {
   try{
    const { name, email } = data;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      name,
      authtype: 'google',
  });
  await user.save();
  } 
  
  return jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1y' });
   }
   catch(error){
     console.error(error);
     return null;
   }

}