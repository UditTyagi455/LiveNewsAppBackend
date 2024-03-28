import mongoose from "mongoose";

const interestTopicSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    topics: [
      {
        _id: {
          type: String,
        },
        topic: {
          type: String,
        },
        interested: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const InterestedTopicModel = mongoose.model(
  "Interestedtopic",
  interestTopicSchema
);
