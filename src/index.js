import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 ,() => {
        console.log(`App is listing at port : ${process.env.PORT}`);
    })
    app.on("error",(err) => {
        console.log(`Error in connecting the App :: ${err}`);
    })
})
.catch((err) => console.log(`Error in connect to database !!!`,err))