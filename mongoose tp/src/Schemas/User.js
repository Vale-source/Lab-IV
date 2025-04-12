import mongoose, { Schema } from "mongoose";

const userSchema = new Schema ({
	name: String,
	age: Number,
	email: String
})

export const User = mongoose.model('User', userSchema)

