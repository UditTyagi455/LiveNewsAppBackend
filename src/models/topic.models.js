import mongoose from "mongoose";

const topicsSchema =new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    interested: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

export const Topics =mongoose.model("Topic",topicsSchema);