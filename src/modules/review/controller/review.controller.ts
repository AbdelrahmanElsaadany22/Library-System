import { Request, Response } from "express";
import { catchAsyncError } from "../../../utils/error.handler";
import reviewModel,{IReview} from "../model/review.model";
import UserModel from "../../user/model/user.model";
import BookModel from "../../book/model/book.model";

export const addReview=catchAsyncError(async(req:Request,res:Response)=>{
    const { bookName,userEmail }: { bookName: string,userEmail : string} = req.body;
    const user=await UserModel.findOne({email:userEmail})
    const book=await BookModel.findOne({name:bookName})
    if(!user||!book)
        res.status(404).json({message:"USER or BOOK not founded"})
    const { rating,comment }: { rating: number,comment : string} = req.body;
    const newReview=await 
    reviewModel.create({bookId:book?._id,userId:user?._id,bookName:book?.name,userEmail:user?.email,rating,comment})
    res.status(200).json({message:"Review added successfully"})
})

export const getReviews=catchAsyncError(async(req:Request,res:Response)=>{
    const {name}:{name:string}=req.body
    const book=await BookModel.findOne({name})
    if(!book)
        res.status(404).json({message:"BOOK not founded"})
    const reviews=await reviewModel.find({bookId:book?._id})
    res.status(200).json({reviews})
})

export const deleteReview=catchAsyncError(async(req:Request,res:Response)=>{
    const {bookName,userEmail}:{bookName:string,userEmail:string}=req.body
    const user=await UserModel.findOne({email:userEmail})
    const book=await BookModel.findOne({name:bookName})
    if(!book||!user)
        res.status(404).json({message:"USER or BOOK not founded"})
    const reviews=await reviewModel.findOneAndDelete({userEmail:user?.email})
    res.status(200).json({message:"Review Deleted succefully"})
})