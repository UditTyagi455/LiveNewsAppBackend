import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const registerUser = (req,res) => {
    const { username, email, fullName, password } = req.body;
    console.log("get-data :::",username,email,fullName,password);
    return res
    .status(201)
    .json({
        msg: "ok"
    })
}

export {
    registerUser
}
