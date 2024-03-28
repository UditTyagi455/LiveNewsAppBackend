import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { UserModels } from "../models/user.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await UserModels.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

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
  console.log("existedUser >>>>>", existedUser);

  if (existedUser) {
    throw new ApiError(401, "User with email already exist");
  }

  const User = await UserModels.create({
    email,
    password,
  });
  console.log("User-present ==>>>", User);

  const createdUser = await UserModels.findById(User._id).select("-password");
  console.log("createdUser >>>>", createdUser);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required!");
  }

  const existUser = await UserModels.findOne({ email });

  console.log("existUser >>>>", existUser);

  if (!existUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await existUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existUser._id
  );

  const loggedInUser = await UserModels.findById(existUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export { registerUser, loginUser };
