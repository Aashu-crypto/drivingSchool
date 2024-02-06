const express = require("express");
const { Instuctor } = require("../db");
const router = express.Router();

router.get("/details", async (req, res) => {
  const instructor = await Instuctor.find();

  res.json({
    instructor,
  });
});

router.post("/", async (req, res) => {
  const body = req.body;
  const instructor = await Instuctor.create({
    name: body.name,
    email: body.email,
    number: body.number,
    totalEarning: body.totalEarning,
    balance: body.balance,
    whatsappNumber: body.whatsappNumber,
    isVerified: body.isVerified,
    status: body.status,
  });

  res.json({
    Insctructer: "Created",
  });
});

module.exports = router;
