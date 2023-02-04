const User = require("../model/user_auth.model");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userRegis = async (req, res) => {
    try {

        const isEmail = req.body.email;
        const password = req.body.password;

        const checkEmail = await User.findOne({ email: isEmail })

        if (checkEmail == null) {
            if (password.length < 6) {
                res.status(403).json({
                    message: "PASSWORD MUST BE 6 CHRECTER",
                    status: 403
                })
            } else {
                const confirmPassword = req.body.confirmPassword;
                if (password == confirmPassword) {

                    const userData = new User({
                        name: req.body.name,
                        email: isEmail,
                        password: password
                    });

                    const saveData = await userData.save();

                    res.status(201).json({
                        message: "USER DATA SUCCESSFULLY INSERT",
                        status: 201,
                        data: saveData
                    })
                } else {
                    res.status(400).json({
                        message: "USER FORBIDDEN",
                        status: 400
                    })
                }
            }

        } else {
            res.status(409).json({
                message: "EMAIL IS ALREADY EXITST",
                status: 409,
                data: []
            });
        }
    } catch (error) {
        console.log("Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};

exports.userlogin = async (req, res) => {
    try {
        const findData = await User.findOne({ email: req.body.email });
        console.log("FIND DATA::", findData);
        if (findData == null) {
            res.status(400).json({
                message: "Data Not Found",
                status: 400,
            })
        } else {
            const token = await findData.generateauthtoken();
            console.log("TOKEN LOGIN:::::::", token);

            if (req.body.password == findData.password) {
                const updateToken = await User.findByIdAndUpdate(
                    {
                        _id: findData._id
                    },
                    {
                        $set: {
                            token: token
                        }
                    }
                )
                res.status(200).json({
                    message: "LOGIN SUCCESSFULLY",
                    status: 200,
                    data: token
                })
            } else {
                res.status(400).json({
                    message: "USER NOT EXITST",
                    status: 400
                })
            }

        }
    } catch (error) {
        console.log("Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};

exports.ForgetPassword = async (req, res) => {
    try {

        const findemail = await User.findOne({ email: req.body.email });
        console.log(findemail);

        if (findemail) {
            const newPass = Math.floor(Math.random() * 1000000);

            const newToken = await findemail.generateauthtoken();
            console.log("NEW TOKEN::::", newToken);
            const New = await User.findByIdAndUpdate(
                {
                    _id: findemail._id
                },
                {
                    $set: {
                        tokens: newToken,
                        password: newPass
                    }
                });

            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: 'auqmxvyffhgayvpk'
                }
            });

            mailOption = {
                from: 'dhavalbodar2002@gmail.com',
                to: req.body.email,
                subject: 'FORGET PASSWORD',
                text: `Your New Password is ${newPass}`
            };
            res.status(201).json({
                message: "PASSWORD CHANGE SUCCESSFULLY",
                status: 201,
                data: `${newPass}`
            })
        } else {
            res.status(400).json({
                message: "THIS EMAIL IS NOT EXITST",
                status: 400
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

exports.ChangePassword = async (req, res) => {

    try {
        const data = req.user._id;
        console.log("DATA::", data);


        const findPass = await User.findOne({ _id: data });
        console.log(findPass);
        const password = req.body.password
        console.log("OLD PASSWORD CHECK::", req.body.oldpassword == findPass.password);
        console.log("NEW PASSWORD CHECK::", password == req.body.confirmPassword);

        if (password.length < 6) {
            res.status(403).json({
                message: "PASSWORD MUST BE 6 CHRECTER",
                status: 403
            })
        } else {
            if (req.body.oldpassword == findPass.password) {

                if (password == req.body.confirmPassword) {
                    const Change = await User.findByIdAndUpdate({ _id: data }, {
                        $set: {
                            password: password
                        }
                    });
                    res.status(200).json({
                        message:"CHANGE PASSWORD SUCCESSFULLY",
                        status:200
    
                    })
                } else {
                    res.status(403).json({
                        message:"USER FORBIDEN",
                        status:403
                    })
                }
    
            } else {
                res.status(400).json({
                    message: "PASSWORD ARE NOT MATCH",
                    status: 400
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message:"SOMETHING WENT WRONG",
            status: 500
        })
    }

}

exports.userGetProfile = async (req, res) => {
    try {
        const data = req.user._id;
        console.log("DATA:::", data);

        const getData = await User.findOne({ _id: data });
        console.log("GET DATA", getData);

        const response = {
            name: getData.name,
            email: getData.email,
            token: getData.token
        }

        res.status(201).json({
            message: "VIEW USER BY ID",
            status: 201,
            info: response
        })

    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500,
        });
    }
}

exports.userPutProfile = async (req, res) => {
    try {
        const data = req.user._id;
        console.log("DATA::", data);

        const getData = await User.findByIdAndUpdate({ _id: data }, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        });

        const response = {
            name: getData.name,
            email: getData.email
        }

        res.status(201).json({
            message: "USER UPDATED",
            status: 201,
            info: response
        })

    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500,
        });
    }
}