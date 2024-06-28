import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/error.handler";
import UserModel from "../../modules/user/model/user.model";
import BookModel from "../../modules/book/model/book.model";
import PurchaseModel from "../model/purchase.model";

export const addPurchase =catchAsyncError(async(req:Request,res:Response)=>{
    const {userId,bookId,quantity,totalAmount}:
    {userId:string,bookId:string,quantity:number,totalAmount:number}=req.body
    const user=await UserModel.findById(userId)
    const book=await BookModel.findById(bookId)
    if(!user||!book){
        return res.status(404).json({message:"the User or Book not founded"})
    }
    if(book.quantity<=0){
        return res.status(400).json({ message: "Book out of stock" });
    }
    if (book.quantity < quantity) {
        return res.status(400).json({ message: "Not enough books in stock" });
    }
    const purchase=PurchaseModel.create({
        userId,
        bookId,
        quantity,
        totalAmount
    })
    const userInterst=book.genre
    if(!user.interests.includes(userInterst)){
        user.interests.push(userInterst)
        await user.save()
    }
    
    book.quantity-=quantity
    await book.save();
    res.status(200).json({ message: "Book purchased successfully" });
})