const contact = require("../model/contact_model");


exports.contactPOSTDetalis = async (req, res) => {
    const  number =  Math.floor(Math.random()* 10000000000);
    try {
        const contactData = new contact({
          name: req.body.name,
          email:req.body.email,
          number:number,
          country:req.body.country,
          message:req.body.message          
        });
        const saveData = await contactData.save();
        res.status(201).json({
            message:"USER DATA SUCCESSFULLY INSERT",
            status:201,
            data: saveData
        })
    } catch (error) {
        console.log("Error:::", error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })      
    }
};