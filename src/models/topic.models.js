import mongoose from "mongoose";

const topicsSchema =new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        unique: true,
    },
    interested: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

export const TopicModel =mongoose.model("Topic",topicsSchema);