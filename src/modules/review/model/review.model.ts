import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface IReview extends Document {
     bookName:string,
     userEmail:string,
     bookId: string;  // Reference to the book being reviewed
     userId: string;  // Reference to the user who wrote the review
     rating: number;  // Rating given by the user, typically a number between 1 and 5
     comment: string; // Textual review provided by the user
     createdAt: Date; // Date when the review was created
 }
 
const reviewSchema: Schema = new mongoose.Schema({
    bookName:{
        type: String,
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    userEmail:{
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const reviewModel = mongoose.model<IReview>('Review', reviewSchema);

export default reviewModel;
