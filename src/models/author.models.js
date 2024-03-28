import mongoose from "mongoose";

const authorSchema =new mongoose.Schema({
    Logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    follow: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

export const AuthorModel =mongoose.model("Author",authorSchema);