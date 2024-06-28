import { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import reviewModel from '../../review/model/review.model';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    age: number;
    address: string;
    interests: string[];
}
const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    interests: {
        type: [String],  // Added interests list
        default: [],     // Default to an empty array
    },
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('email')) {
        await reviewModel.updateMany({ userId: user._id }, { userEmail: user.email });
    }
    next();
});
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
