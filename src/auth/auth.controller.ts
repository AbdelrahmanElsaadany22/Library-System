import { Request, Response } from "express";
import { AppError, catchAsyncError } from "../utils/error.handler";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();
import userModel from "../modules/user/model/user.model";
export const signin = catchAsyncError(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password!)) {// != not null ,not defiened
        throw new AppError('Invalid credentials', 400);
    }

    const { name, _id: id ,role} = user;
    const token = jwt.sign({ name, id, email,role }, process.env.SECRET!);

    res.status(200).json({ token });
});
export const signup=catchAsyncError(async(req:Request,res:Response)=>{
    const {email,name,password,age,role,address}=req.body
    const hashed_pass=bcrypt.hashSync(password,Number(process.env.SALT))
    const user=userModel.create({name,email,password:hashed_pass,age,role,address})
    res.status(201).json({message:'signed up successfully'})
})
