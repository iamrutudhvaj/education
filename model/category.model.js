const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    active:{
        type:Number,
        require:true
    }
},{
    timestamps: true
},{
    collection: 'category'
})



module.exports = mongoose.model("category",categorySchema);