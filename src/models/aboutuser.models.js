import mongoose, { Schema } from "mongoose";

const aboutUserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topics",
      },
    ],
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    avatar: {
      type: String,
    },
    email: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      required: true
    },
    socialLogin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const AboutUserModel = mongoose.model("aboutuser", aboutUserSchema);
