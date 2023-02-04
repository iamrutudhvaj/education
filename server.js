require("dotenv").config();
require("./database/connection");
const express = require("express");
const cors = require("cors")
const app = express();
const userRouter = require("./routers/user.router");
const contactRouter = require("./routers/contact.router");
const categoryRouter = require("./routers/category.router");
const courseRouter = require("./routers/course.router");
const port = process.env.PORT;


app.use(express.json());
app.use(cors());


const cookiesParser = require("cookie-parser");

app.use(express.urlencoded({extended: false}));
app.use(cookiesParser());


app.use("/auth", userRouter);
app.use("/contact", contactRouter);
app.use("/category", categoryRouter);
app.use("/course", courseRouter);

app.listen(8000, () => {
    console.log(`Server is Running At PORT : 8000`);
})
