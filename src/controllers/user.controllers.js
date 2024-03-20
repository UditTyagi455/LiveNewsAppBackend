import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import fs from "fs"
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

const topics = asyncHandler(async (req,res) => {
  const topics = [
    {
      id: 1,
      topic: "National"
    },
    {
      id: 2,
      topic: "International"
    },
    {
      id: 3,
      topic: "Sport"
    },
    {
      id: 4,
      topic: "Lifestyle"
    },
    {
      id: 5,
      topic: "Business"
    },
    {
      id: 6,
      topic: "Health"
    },
    {
      id: 7,
      topic: "Fashion"
    },
    {
      id: 8,
      topic: "Technology"
    },
    {
      id: 9,
      topic: "Science"
    },
    {
      id: 10,
      topic: "Art"
    },
    {
      id: 11,
      topic: "Poltics"
    }
  ]

  return res
  .status(200)
  .json(
    new ApiResponse(200,topics,"All topics")
  )
})

const authors = asyncHandler(async(req,res) => {
  const author = [
    {
      id: 1,
      image:  "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957881/etsbzbvdm4omrzactj6w.png",
      name: 'BBC News',
      follow: false,
    },
    {
      id: 2,
      image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
      name: 'SCMP',
      follow: false,
    },
      {
        id: 3,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'CNN',
        follow: false,
      },
      {
        id: 4,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'MSN',
        follow: false,
      },
      {
        id: 5,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'CNET',
        follow: false,
      },
      {
        id: 6,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'USA Today',
        follow: false,
      },
      {
        id: 7,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'TIME',
        follow: false,
      },
      {
        id: 8,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'Buzzfeed',
        follow: false,
      },
      {
        id: 9,
        image: "http://res.cloudinary.com/dydqwz5bv/image/upload/v1710957163/lataf5hzndqfjizvjsaa.png",
        name: 'Daily Mail',
        follow: false,
      },
  ];

  return  res
  .status(200)
  .json(
    new ApiResponse(200,author,"all authors")
  )
})

export { registerUser, uploadAvatar,topics,authors }
