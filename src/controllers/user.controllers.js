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


const authors = asyncHandler(async (req, res) => {
  const author = [
    {
      id: 1,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957881/etsbzbvdm4omrzactj6w.png",
      name: "BBC News",
      follow: false,
    },
    {
      id: 2,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "SCMP",
      follow: false,
    },
    {
      id: 3,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "CNN",
      follow: false,
    },
    {
      id: 4,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "MSN",
      follow: false,
    },
    {
      id: 5,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "CNET",
      follow: false,
    },
    {
      id: 6,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "USA Today",
      follow: false,
    },
    {
      id: 7,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "TIME",
      follow: false,
    },
    {
      id: 8,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "Buzzfeed",
      follow: false,
    },
    {
      id: 9,
      image:
        "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: "Daily Mail",
      follow: false,
    },
  ];

  return res.status(200).json(new ApiResponse(200, author, "all authors"));
});

export { registerUser, authors };
