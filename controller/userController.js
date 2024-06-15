import users from "../Model/userModel.js";
import jwt from 'jsonwebtoken'

const userRegister= async (req,res)=>{
const {username,email,password}=req.body;
try {
    const existingUser=await users.findOne({email});
    if(existingUser){
        res.status(406).json('user already registered! please login...')
    }else{
        const newUser=new users({username,email,password});
        await newUser.save();
        res.status(200).json('user registered successfully')
    }
    
} catch (error) {
    res.status(401).json({error: error.message});
}
}

const userLogin=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const existingUser=await users.findOne({email,password});
        if(existingUser){
            // const userId=existingUser._id;
            // const jwtSecretKey=process.env.JWT_SECRET_KEY
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY)
            res.status(200).json({token,existingUser})
        }else{
            res.status(401).json('Invalid email / Password')
        }
        
    } catch (error) {
        res.status(406).json({error:error.message})
    }
}

export {userRegister,userLogin}