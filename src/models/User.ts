import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
    user: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    user: { type: String, required: true, min: 4, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
})

export default model<IUser>('User', userSchema)