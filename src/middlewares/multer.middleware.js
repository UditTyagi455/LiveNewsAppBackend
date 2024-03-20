import fs from "fs";
import util from "util"
import multer from "multer";

const maxSize = 100 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
 })

 