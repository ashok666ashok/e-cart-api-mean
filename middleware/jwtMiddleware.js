import jwt from 'jsonwebtoken'

const jwtMiddleware=(req,res,next)=>{
    try {
        const token=req.headers['authorization'].split(" ")[1];
        if(token){
            const jwtResponse=jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.payload=jwtResponse.userId
            next()
        }else{
            res.status(406).json('invalid token')
        }
        
    } catch (error) {
        res.status(401).json('please login...',)
    }
}

export default jwtMiddleware