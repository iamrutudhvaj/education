const Course = require("../model/course.model");

exports.CourseRegis = async (req, res) => {
    try {
        const active = req.body.active

        if (active == 1) {

            const courseData = new Course({
                image:req.body.image,
                name:req.body.name,
                descripation: req.body.descripation,
                category:req.body.category,
                active: req.body.active
            })
    
            const saveData = await courseData.save();
    
            res.status(201).json({
                message:"COURSE DATA INSERTED",
                status:201,
                data:saveData
            });
        } else if (active == 2){

                const courseData = new Course({
                    image:req.body.image,
                    name:req.body.name,
                    descripation: req.body.descripation,
                    category:req.body.category,
                    active: req.body.active
                })
        
                const saveData = await courseData.save();
        
                res.status(201).json({
                    message:"COURSE DATA INSERTED",
                    status:201,
                    data:saveData
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
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}

exports.CoursePut = async (req, res) => {
    try {
        
        try {
            const id = req.params.id;

            const findData = await Course.findByIdAndUpdate({_id: id},{
                $set:{
                    image:req.body.image,
                    name:req.body.name,
                    descripation: req.body.descripation,
                    category:req.body.category,
                    active: req.body.active
                }
            })
            res.status(200).json({
                message:"COURSE DATA UPDATED",
                status:200,
                data:findData
            });
        } catch (error) {
            console.log("ERROE::", error);
            res.status(400).json({
                message:"USER FORBIDDEN",
                status:400
            })
        }

    } catch (error) {
        console.log("ERROR::", error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}

exports.CourseGetPage = async (req, res) => {
    try {
        req.body = 1;
        const findActive = await Course.find({active : req.body});
        console.log("FIND DATA::", findActive);

        if (findActive) {
            const {page, limit} = req.query;
            if (!page) page = 1;
            if(!limit) limit = 5;

            const skip = (page -1) * 5;
            const users = await Course.find().skip(skip).limit(limit);

            res.status(200).json({
                message:"SHOW DATA BY PAGE",
                status:200,
                data: users
            })
        }

    } catch (error) {
        console.log("ERROR::", error);
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}
 
exports.CourseGetById = async (req, res) => {
    try {
    
        const id = req.params.id;
        const findData = await Course.findById({_id: id});
        console.log("DATA SHOW::", findData);

        res.status(200).json({
            message:"SHOW DATA",
            status:200,
            data:findData 
        })

    } catch (error) {
        console.log("ERROR::", error);
        res.status(500).json({
            message:"SOMETHING WENT WRRONG",
            status:500
        })
    }
}

exports.CourseCatePage = async(req, res) => {
    try {

        const findActive = await Cate.find({active : req.body.active});
        console.log(findActive);

        if (findActive) {
            const { page, limit } = req.query;
            if (!page) page = 1;
            if (!limit) limit = 5;

            const skip = (page - 1) * 5;
            const users = await Course.find().skip(skip).limit(limit);
            
            res.status(200).json({
                message:"SHOW DATA BY ACTIVE",
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