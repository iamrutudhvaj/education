const Cate = require("../model/category.model");


exports.cateRegis = async (req, res) => {
    try {
            const active = req.body.active
            if (active == 1) {
                const courseData = new Cate({
                    name: req.body.name,
                    active: active
                });
                const saveData = await courseData.save();
                res.status(201).json({
                    message: "CATEGORY DATA SUCCESSFULLY INSERT",
                    status: 201,
                    data: saveData
                });
            } else if(active == 2){
                const courseData = new Cate({
                    name: req.body.name,
                    active: active
                });
                const saveData = await courseData.save();
                res.status(201).json({
                    message: "CATEGORY DATA SUCCESSFULLY INSERT",
                    status: 201,
                    data: saveData
                });
            } else{
                res.status(400).json({
                    message:"USER FORBIDDEN",
                    status:400
                })
            }

    } catch (error) {
        console.log("Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.catePutData = async (req, res) => {

    try {
            const id = req.params.id;

            const categetData = await Cate.findByIdAndUpdate({ _id: id }, {
                $set: {
                    name: req.body.name,
                    active: req.body.active
                }
            });
            res.status(201).json({
                message: "CATEGORY DATA UPDATED",
                status: 201,
                Data: categetData
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        });
    }
}

exports.cateGetProfile = async (req, res) => {
    try {
        const id = req.params.id;

        const getData = await Cate.findOne({ _id: id });
        res.status(200).json({
            message: "CATEGORY GET PROFILE",
            status: 200,
            Data: getData
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        });
    }
}

exports.cateGetdata = async (req, res) => {
    try {

        req.body = 1;
        const findActive = await Cate.find({active : req.body});
        console.log(findActive);

        if (findActive) {
            const { page, limit } = req.query;
            if (!page) page = 1;
            if (!limit) limit = 5;

            const skip = (page - 1) * 5;
            const users = await Cate.find().skip(skip).limit(limit);
            
            res.status(200).json({
                message:"SHOW DATA ACTIVE",
                status:200,
                category: users
            })   
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
