import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


const protect = async (req , resizeBy,next) =>{
    try{   
        const token = req.cookies.token
        if(!token) {
            return res.status(404).json({message:"unauthorized"})
        }

        const decoded = jwt.verify(token,process.env.JWt_SECRET)
        const user = await User.findById(decoded.userId)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        req.user=user
        next();
    }catch(error){
         return res.status(500).json({message:`protect error ${error}`})
    }
}

export default protect