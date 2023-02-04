const router = require("express").Router();

const {
    cateRegis,
    catePutData,
    cateGetdata,
    cateGetProfile
} = require("../controller/category.controller");


router.post("/registration", cateRegis);
router.put("/update/:id", catePutData);
router.get("/viewbypage",  cateGetdata);
router.get("/profile/:id", cateGetProfile);


module.exports = router;