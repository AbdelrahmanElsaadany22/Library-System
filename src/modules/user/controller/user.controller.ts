import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/error.handler";
import userModel from "../model/user.model";
import BookModel from "../../book/model/book.model";

export const getAllUsers=catchAsyncError(async(req:Request,res:Response)=>{
    const users=await userModel.find()
    if(users.length===0)
        {
           return res.status(404).json({ message: 'there is no users to find' });
        }
    res.status(200).json({users});
})
export const getUser=catchAsyncError(async(req:Request,res:Response)=>{
    const {email}:{email:string}=req.body
    const user=userModel.findOne({email})
    if(!email)
        res.status(404).json({message:'email not founded'})
    res.status(200).json({user})
})

export const getRecommendation=catchAsyncError(async(req:Request,res:Response)=>{
    const { userId }: { userId: string } = req.body;
    
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const interestsOfUser = user.interests;
    if (interestsOfUser.length === 0) {
        return res.status(404).json({ message: 'We have not completed data' });
    }
    const recommendations = await BookModel.find({ genre: { $in: interestsOfUser } });

    res.status(200).json({ recommendations });
})