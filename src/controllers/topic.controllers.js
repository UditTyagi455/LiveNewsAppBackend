import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { TopicModel } from "../models/topic.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { InterestedTopicModel } from "../models/interesttopic.model.js";

const getTopics = asyncHandler(async (req, res) => {

  const fields = await TopicModel.find().select("-__v");
  console.log('fields >>>>',fields);

  return res.status(200).json(new ApiResponse(200, fields, "All Topics"));
});

const addTopics = asyncHandler(async (req, res) => {
  const { topic, interested } = req.body;

  if (!topic) {
    throw new ApiError(400, "topic field missing!");
  }

  const topics = await TopicModel.create({
    topic: topic,
    interested: interested || false,
  });

  console.log("topics ::", topics);

  if (!topics) {
    throw new ApiError(400, "topics not created!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, topics, "topic created successfully!"));
});

const selectedTopics = asyncHandler(async (req, res) => {
  const { userId, topics } = req.body;
  let returnData;

  console.log("req.body ####>>>", userId, topics, topics.length);

  if (!userId) {
    throw new ApiError(400, "All Fields are required!");
  }

  if (topics.length <= 0) {
    throw new ApiError(400, "All Fields are required!");
  }

  const findByUserId = await InterestedTopicModel.findOne({ userId });

  console.log("findByuserId >>>>", findByUserId);

  if (findByUserId) {
    console.log("findByUserId._id ===>", findByUserId._id);
    returnData = await InterestedTopicModel.findOneAndUpdate(
      findByUserId._id,
      {
        $set: {
          topics,
        },
      },
      { new: true }
    ).select("-__v");
  } else {
    const InterestedTopic = await InterestedTopicModel.create({
      userId,
      topics,
    });

    if (!InterestedTopic) {
      throw new ApiError(
        500,
        "there some issue to create the interested topic"
      );
    }

    returnData = await InterestedTopicModel.findById(
      InterestedTopic._id
    ).select("-__v");

    console.log("InterestedTopic ===>", InterestedTopic);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, returnData, "Interested topic created!"));
});

export { getTopics, addTopics, selectedTopics };
