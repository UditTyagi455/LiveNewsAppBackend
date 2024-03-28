import mongoose from "mongoose";

const followAuthorSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    follow: [
        {
            _id: {
                type: String
            },
            Logo: {
                type: String
            },
            name: {
                type: String
            },
            follow: {
                type: Boolean
            }
        }
    ]
},{
    timestamps: true
});

export const FollowAuthorModel =mongoose.model("FollowAuthor",followAuthorSchema);