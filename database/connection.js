const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("ADD MONOGDB CONNECTION URL HERE")
.then(() => {
    console.log("Connection SuccessFully");
})
.catch((err) => {
    console.log("Not Connected", err);
})