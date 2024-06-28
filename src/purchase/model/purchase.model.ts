import { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
export interface IPurchase extends Document {
    userId: string; // Reference to the user who made the purchase
    bookId:string; // Reference to the book being purchased
    transactionDate: Date; // Date when the purchase was made
    quantity: number; // Number of copies of the book purchased
    totalAmount: number; // Total amount paid for the purchase
}

const purchaseSchema: Schema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
     },
    transactionDate: { 
        type: Date,
        default: Date.now, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    totalAmount: { 
        type: Number, 
        required: true, 
        min: 0 
    },
});

const PurchaseModel = mongoose.model<IPurchase>('Purchase', purchaseSchema);

export default PurchaseModel;