import { catchAsyncError } from "../../../utils/error.handler";
import { Request, Response } from "express";
import BookModel ,{ IBook }  from "../model/book.model";
export const addBook=catchAsyncError(async(req:Request,res:Response)=>{
    const bookData: Partial<IBook> = req.body;
    const addedBook=await BookModel.create(bookData)
    res.status(200).json({message:"Book Added successfully"})
})
export const getAllBooks=catchAsyncError(async(req:Request,res:Response)=>{
    const books=await BookModel.find()
    if(!books)
        res.status(404).json({message:"There is no books to show"})
    res.status(200).json({books})
})
export const getBookByName=catchAsyncError(async(req:Request,res:Response)=>{
    const { name }: { name: string } = req.body;
    const book = await BookModel.findOne({name})
    if(!book)
        res.status(404).json({message:"There is no book by this name"})
    res.status(200).json({book})
})
export const getBooksForAuthor=catchAsyncError(async(req:Request,res:Response)=>{
    const {author}: { author: string }=req.body
    const book = await BookModel.find({author})//all books that the author write it
    if(!book)
        res.status(404).json({message:"There is no book to this author"})
    res.status(200).json({book})
})

export const deleteBook=catchAsyncError(async(req:Request,res:Response)=>{
    const { name }: { name: string } = req.body;
    const book=await BookModel.findOne({name})
    if(!book)
        res.status(404).json({message:"There is no book by this name"})
    await BookModel.findOneAndDelete({name})
    res.status(200).json({message:"Book Deleted Successfully"})
})

export const updateBook=catchAsyncError(async(req:Request,res:Response)=>{
    const { name }: { name: string } = req.body;
    const updatedBook: Partial<IBook> = req.body;
    const book=await BookModel.findOneAndUpdate({name},updatedBook)
    if(!book)
        res.status(404).json({message:"There is no book by this name"})
    res.status(200).json({message:"Book Updated Successfully"});
})