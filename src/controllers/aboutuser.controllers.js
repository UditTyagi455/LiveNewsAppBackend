import mongoose from "mongoose";
import { AboutUserModel } from "../models/aboutuser.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModels } from "../models/user.models.js";
import { InterestedTopicModel } from "../models/interesttopic.model.js";

const uploadAvatar = asyncHandler(async (req, res) => {
  const avtarLocalPath = req.file.path;

  console.log("avtarLocalPath :::", avtarLocalPath);
  if (!avtarLocalPath) {
    throw new ApiError(400, "file path not exist");
  }

  const uploadImage = await uploadOnCloudinary(avtarLocalPath);
  console.log("uploadImage url ::", uploadImage);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { path: uploadImage.url },
        "profile uploaded successfully"
      )
    );
});

const createUser = asyncHandler(async (req, res) => {
  const { id, country, username, fullName, phone, avatar } = req.body;
  console.log("enter-data >>>>>", country, username, fullName, phone);

  if ([country, username, fullName, phone].some((field) => !field)) {
    throw new ApiError(400, "All Fields are required!");
  }

  const findUser = await UserModels.findById(id);
  if (!findUser) {
    throw new ApiError(401, "some error to find the user");
  }
  console.log("findUser >>>", findUser.email);

  const Interestedtopic = await InterestedTopicModel.find({userId: id});
  if(!findUser){
    throw new ApiError(401, "some error to find the interested topic");
  }
  console.log("Interestedtopic >>>>",Interestedtopic[0].topics);

  const CreatedUser = await AboutUserModel.create({
    userid: id,
    country,
    username,
    fullName,
    phone,
    avatar,
  });

  if (!CreatedUser) {
    throw new ApiError(500, "some error to create the user!");
  }

  const result = {
    email: findUser.email,
    CreatedUser,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, result, "user created successfully!"));
});

export { uploadAvatar, createUser };
