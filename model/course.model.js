const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    descripation:{
        type:String,
        require:true
    },
    category:{
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
    collection: 'course'
});


module.exports = mongoose.model('course', courseSchema);