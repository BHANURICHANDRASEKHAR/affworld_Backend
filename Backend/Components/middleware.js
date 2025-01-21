import jwt from 'jsonwebtoken'
export default function middleware_function(req, res, next) {
    const token=req.headers['x-token'];
    
    if(!token){
        return res.status(401).send({msg: 'Token is required', status: false});
    }
    else{
    const data=jwt.decode(token,process.env.JWT_SECRET)
    if(!data){
        return res.status(401).send({msg: 'Invalid token', status: false});
    }
    req.user=data;
    next();
    }
}