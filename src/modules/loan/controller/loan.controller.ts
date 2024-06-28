import { Request ,Response} from "express"
import { catchAsyncError } from "../../../utils/error.handler"
import cron from 'node-cron';
import UserModel from "../../user/model/user.model";
import BookModel from "../../book/model/book.model";
import LoanModel,{ILoan} from "../model/loan.model";

export const loanBook=catchAsyncError(async(req:Request,res:Response)=>{
    const { bookId, userId, dueDate }:{bookId:string,userId:string,dueDate:Date} = req.body;
    const user=await UserModel.findById(userId)
    const book=await BookModel.findById(bookId)
    if(!book||!user)
        return res.status(404).json({message:"USER or BOOK not founded"})
    const bookCopies=book?.quantity ?? 0
    if (bookCopies <= 0) {
        return res.status(400).json({ message: "Book not available for borrowing" });
    }
    book.quantity -=1;
    await book.save()
    const loan=await LoanModel.create({
        bookId,
        userId,
        dueDate,
        loanDate: new Date()})
        const userInterst=book.genre
        if(!user.interests.includes(userInterst)){
            user.interests.push(userInterst)
            await user.save()
        }
        
        await loan.save();
    res.status(200).json({ message: "Book successfully borrowed"});

})
cron.schedule('0 0 * * *', async () => {
    try {
        // Find all loans where the due date is in the past and the book hasn't been returned
        const overdueLoans: ILoan[] = await LoanModel.find({
            dueDate: { $lt: new Date() },
            returnedAt: { $exists: false }
        });

        // Update the inventory for each overdue book
        for (const loan of overdueLoans) {
            await BookModel.findByIdAndUpdate(loan.bookId, {
                $inc: { quantity: 1 }
            });
        }

        console.log(`Updated inventory for ${overdueLoans.length} overdue books.`);
    } catch (error) {
        console.error('Error updating inventory:', error);
    }
});