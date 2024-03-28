import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { UserModels } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  // const avtarLocalPath = req.file.path;
  const { email, password } = req.body;
  console.log("get-data :::", email, password);

  if ([email, password].some((field) => !field)) {
    throw new ApiError(400, "All Fields are required!");
  }
  // if (!email?.includes("@")) {
  //   throw new ApiError(400, "Email Address Not Valid!");
  // }

  const existedUser = await UserModels.findOne({ email });
  console.log("existedUser >>>>>",existedUser);

  if (existedUser) {
    throw new ApiError(401, "User with email already exist");
  }

  const User = await UserModels.create({
    email,
    password,
  });
  console.log("User-present ==>>>",User);

  const createdUser = await UserModels.findById(User._id).select("-password");
  console.log("createdUser >>>>",createdUser);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

export { registerUser};
