import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { UserModel } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  // const avtarLocalPath = req.file.path;
  const {
    username,
    email,
    fullName,
    password,
    phoneNumber,
    country,
    topics,
    author,
    avatar,
  } = req.body;
  console.log(
    "get-data :::",
    username,
    email,
    fullName,
    password,
    phoneNumber,
    country,
    topics,
    author,
    avatar
  );

  if (
    [
      username,
      email,
      fullName,
      password,
      phoneNumber,
      country,
    ].some((field) => !field)
  ) {
    throw new ApiError(400, "All Fields are required!");
  }
  if (!email?.includes("@")) {
    throw new ApiError(400, "Email Address Not Valid!");
  }

  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const User = await UserModel.create({
    username,
    email,
    fullName,
    password,
    phoneNumber,
    country,
    avatar
  })
  
  const createdUser = await UserModel.findById(User._id).select(
    "-password -refreshToken"
  );
 

  return res
  .status(201)
  .json(
    new ApiResponse(200,createdUser, "User Created Successfully")
  );
});

const uploadAvatar = asyncHandler(async (req, res) => {
  const avtarLocalPath = req.file.path;

  console.log("avtarLocalPath :::", avtarLocalPath);
  if (!avtarLocalPath) {
    throw new ApiError(400, "file path not exist");
  }

  const uploadImage = await uploadOnCloudinary(avtarLocalPath);
  console.log("uploadImage url ::", uploadImage);

  return res.status(200).json({
    path: uploadImage.url,
  });
});

export { registerUser, uploadAvatar };
