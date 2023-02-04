const jwt = require("jsonwebtoken");
const user = require("../model/user_auth.model");

exports.verify = async (req, res, next) => {
    try {
        const Token = req.headers['authorization'];
        console.log("TOKEN-MIDD::", Token);

        if (Token) {
            const decoded = jwt.verify(Token, "education");
            const data = await user.findById({ _id: decoded._id });
            console.log("DATA-VERIFY", data);
            if (data) {
                req.user = data 
                if (Token == data.token) {
                    next();
                }
                else {
                    res.status(401).json({
                        message: "UNAUTHORIZED",
                        status: 401
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "DATA NOT FOUND!",
                    status: 404
                })

            }
        } else {
            res.send("USER FORBIDEN");
        }
    } catch (error) {
        console.log("ERROR::", error);
    }
}

