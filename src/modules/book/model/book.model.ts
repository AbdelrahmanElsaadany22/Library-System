import mongoose, { Document, Schema } from 'mongoose';
import reviewModel from '../../review/model/review.model';
export interface IBook extends Document {
    name: string;
    author: string;
    publisher?: string;
    publishedDate?: Date;
    quantity: number;
    price: number;
    genre: 'Comedy' | 'Drama' | 'Action' | 'Romance' | 'Adventure' | 'Fantasy' | 'Scientific' | 'Historical' | 'Mystery' | 'Thriller' | 'Horror' | 'Biography' | 'Self-Help' | 'Poetry' | 'Non-fiction' | 'Young Adult' | 'Travel' | 'Classics';
    isbn: string;
    language?: string;
    pages?: number;
}

const bookSchema:Schema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price:{
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        enum: ['Comedy', 'Drama', 'Action', 'Romance', 'Adventure', 'Fantasy', 'Scientific', 'Historical', 'Mystery', 'Thriller', 'Horror', 'Biography', 'Self-Help', 'Poetry', 'Non-fiction', 'Young Adult', 'Travel', 'Classics'],
        default: 'Comedy',
        required: true,
    },
    language: {
        type: String,
        default: 'English',
    },
})
bookSchema.pre('save', async function (next) {
    const book = this;
    if (book.isModified('name')) {
        await reviewModel.updateMany({ bookId: book._id }, { bookName: book.name });
    }
    next();
});
const BookModel = mongoose.model<IBook>('Book', bookSchema);

export default BookModel;