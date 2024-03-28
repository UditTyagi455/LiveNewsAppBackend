import mongoose from "mongoose";
import { AuthorModel } from "../models/author.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { FollowAuthorModel } from "../models/followauthor.models.js";

const addAuthors = asyncHandler(async (req, res) => {
  const { Logo, name, follow } = req.body;
  console.log("author-data >>>>>", Logo, name, follow);

  if ([Logo, name].some((field) => !field)) {
    throw new ApiError(400, "All Fields are required!");
  }

  const Authors = await AuthorModel.create({
    Logo,
    name,
    follow,
  });

  if (!Authors) {
    throw new ApiError(500, "Some Api Error to create the author");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Authors, "Author created successfully!"));
});

const getAuthors = asyncHandler(async (req, res) => {
  const allAuthors = await AuthorModel.find().select(
    "-__v -createdAt -updatedAt"
  );

  if (!allAuthors) {
    throw new ApiError(500, "there some issue to find the author");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allAuthors, "Author fetched successfully!"));
});

const followAuthors = asyncHandler(async (req, res) => {
  const { userId, follow } = req.body;
  let responseData;

  console.log("req.body >>>>>", userId, follow);

  if (!userId) {
    throw new ApiError(400, "All Fields are required!");
  }

  if (follow.length <= 0) {
    throw new ApiError(400, "All Fields are required!");
  }

  const findByUserId = await FollowAuthorModel.findOne({ userId });

  if(findByUserId){
    responseData =await FollowAuthorModel.findOneAndUpdate(
      findByUserId._id,
      {
        $set: {
          follow,
        },
      },
      { new: true }
    ).select("-__v");

    if (!responseData) {
      throw new ApiError(500, "some error into create author");
    }
  }else {
    responseData = await FollowAuthorModel.create({
      userId,
      follow,
    });
  
    if (!responseData) {
      throw new ApiError(500, "some error into create author");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Thanks for following!"));
});

export { addAuthors, getAuthors, followAuthors };
