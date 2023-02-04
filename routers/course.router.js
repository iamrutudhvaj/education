const router = require("express").Router();

const {
    CourseRegis,
    CoursePut,
    CourseGetPage,
    CourseGetById,
    CourseCatePage

} = require("../controller/course.controller");

router.post("/registration", CourseRegis);
router.put("/courseupdate/:id", CoursePut);
router.get("/viewbypage", CourseGetPage);
router.get("/corseprofile/:id",CourseGetById);
router.get("/viewbycate", CourseCatePage)

module.exports = router;