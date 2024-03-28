import mongoose from "mongoose";
import { AboutUserModel } from "../models/aboutuser.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModels } from "../models/user.models.js";
import { InterestedTopicModel } from "../models/interesttopic.model.js";
import { FollowAuthorModel } from "../models/followauthor.models.js";

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
  const { userid, country, username, fullName, phone, avatar } = req.body;
  console.log("enter-data >>>>>", country, username, fullName, phone);

  if ([country, username, fullName, phone].some((field) => !field)) {
    throw new ApiError(400, "All Fields are required!");
  }

  const findUser = await UserModels.findById(userid);
  if (!findUser) {
    throw new ApiError(401, "some error to find the user");
  }
  console.log("findUser >>>", findUser.email);

  const interestedTopic = await InterestedTopicModel.find({ userId: userid });

  console.log("interestedTopic :::", interestedTopic);

  const followAuthor = await FollowAuthorModel.find({ userId: userid });
  console.log("followAuthor :::", followAuthor);

  const CreatedUser = await AboutUserModel.create({
    userid: userid,
    country,
    username,
    fullName,
    phone,
    avatar,
  });

  if (!CreatedUser) {
    throw new ApiError(500, "some error to create the user!");
  }

  const findCreatedUser = await AboutUserModel.findById(CreatedUser._id);
  console.log("findCreatedUser >>>>", findCreatedUser);

  const result = {
    _id: findCreatedUser._id,
    email: findUser.email,
    userid: findCreatedUser.userid,
    country: findCreatedUser.country,
    fullName: findCreatedUser.fullName,
    username: findCreatedUser.username,
    phone: findCreatedUser.phone,
    topics: interestedTopic.length > 0 ? interestedTopic[0].topics : [],
    author: followAuthor.length > 0 ? followAuthor[0].follow : [],
  };

  return res
    .status(200)
    .json(new ApiResponse(200, result, "user created successfully!"));
});

export { uploadAvatar, createUser };
