const router = require("express").Router();

const { 
    contactPOSTDetalis
} = require("../controller/contact.controller");

router.post("/detalis/insert", contactPOSTDetalis)

module.exports = router;