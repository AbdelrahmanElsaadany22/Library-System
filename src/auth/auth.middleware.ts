import { NextFunction, Request, Response } from "express";
import { AppError, catchAsyncError } from "../utils/error.handler";
import userModel from "../modules/user/model/user.model";
import jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { User } from "../types/express";
dotenv.config();
export const assertUniqueEmail=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const {email}=req.body
    const user=await userModel.findOne({email})
    if(user)
        throw new AppError('This email is already taken', 400)
    next()
})
export const authenticate=catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.header('token')
    if(!token)
        {
            throw new AppError('token not founded',404)
        }
    else if(!token.startsWith('Bearer'))
        {
            throw new AppError('token is in false form',401)
        }
    const brToken=token.split(' ')[1]
    const decoded=jwt.verify(brToken,process.env.SECRET!)as User;
    req.user=decoded
    next()
})
export const authorize = (role: 'user' | 'admin',role1?: 'user' | 'admin') => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }
      if (req.user.role !== role) {
        throw new AppError('Forbidden', 403);
      }
      next();
    };
  };