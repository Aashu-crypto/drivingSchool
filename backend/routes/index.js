const express = require("express");
const instructorRouter = require("./instructor");
const router = express.Router();
router.use("/Instuctor", instructorRouter);
// router.use('/Student',studentRouter)

module.exports = router;
