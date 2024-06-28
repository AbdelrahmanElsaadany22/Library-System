import { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
export interface ILoan extends Document {
    bookId: string;   // Reference to the book
    userId: string;   // Reference to the user who borrowed the book
    borrowedAt: Date; // Date when the book was borrowed
    dueDate: Date;    // Date when the book is due to be returned
    returnedAt?: Date; // Date when the book was returned (optional)
}

const loanSchema: Schema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    borrowedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
});

const LoanModel = mongoose.model<ILoan>('Loan', loanSchema);

export default LoanModel;
