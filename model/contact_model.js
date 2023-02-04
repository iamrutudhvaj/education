const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        number:{
            type:Number,
            require:true,
            minlength:10,
            maxlength:10
        },
        country:{
            type:String,
            require:true
        },
        message:{
            type:String,
            require:true
        }

},{
    timestamps: true
},{
    collection: 'contact'
});


module.exports = mongoose.model("contact", contactSchema);