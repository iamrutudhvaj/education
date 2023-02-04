const router = require("express").Router();
const { verify } = require("../middleware/authantication");


const {
        userRegis,
        userlogin,
        ForgetPassword,
        ChangePassword,
        userGetProfile,
        userPutProfile,
} = require("../controller/user.controller");


router.post("/registration", userRegis);
router.post("/login",  userlogin);
router.get("/profile", verify, userGetProfile);
router.put("/profileupdate", verify, userPutProfile);


router.post("/passwordforget", ForgetPassword);
router.put("/changePassword", verify, ChangePassword);

module.exports = router;
