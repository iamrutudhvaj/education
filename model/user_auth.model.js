const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword: {
        type: String
    },
    token : {
        type: String,
        default: null
    }
},{
    timestamps: true
},{
    collection: 'users'
});


userSchema.methods.generateauthtoken = async function (res) {
    try {
        const generateToken = jwt.sign({ _id: this._id.toString() }, "education")
        this.token = generateToken
        return generateToken;
    }
    catch (err) {
        console.log('ERROR-MODEL::', err);
        res.status(403).json({ 
            message: "TOKEN NOT GENERATE",
            status: 403
        })
    }
}



module.exports = mongoose.model("users", userSchema);


