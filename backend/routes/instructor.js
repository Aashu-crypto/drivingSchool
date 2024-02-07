const express = require("express");
const { Instructor } = require("../db");
const router = express.Router();

router.get("/details", async (req, res) => {
  const instructor = await Instructor.find();

  res.json({
    instructor,
  });
});

router.post("/addInstructor", async (req, res) => {
  try {
    const { body } = req;

    // Since you have nested objects and arrays, make sure to include them in the creation logic
    const instructor = await Instructor.create({
      name: body.name,
      email: body.email,
      number: body.number,
      totalEarning: body.totalEarning,
      balance: body.balance,
      whatsappNumber: body.whatsappNumber,
      verified: body.verified,
      status: body.status,
      gender: body.gender,
      image: body.image, // Assuming the image is handled as a URL or file path
      imageUrl: body.imageUrl,
      address: body.address,
      bankDetails: {
        ...body.bankDetails,
        documents: body.bankDetails.documents, // Assuming this is an array of strings (URLs or file paths)
        documentUrls: body.bankDetails.documentUrls
      },
      carDetails: body.carDetails,
    });

    res.json({
      message: "Instructor Created Successfully",
      instructorId: instructor._id // Return the ID of the created instructor
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating instructor",
      error: error.message
    });
  }
});

module.exports = router;
