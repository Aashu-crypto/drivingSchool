const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Instructor } = require("../db");
const { generatePassword } = require("../utils/passwordUtils");
const { SendMail } = require("../controllers/SendMail");
const router = express.Router();

router.get("/details", async (req, res) => {
  const instructor = await Instructor.find();

  res.json({
    instructor,
  });
});
router.put("/updateInstructor/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Assuming the updates are sent in the request body

  try {
    // Find the document by id and update it with the values provided in the request body
    const updateInstructor = await Instructor.findOneAndUpdate(
      { _id: id }, // Filter by id
      updates, // Apply updates from request body
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the update respects schema validations
      }
    );

    if (!updateInstructor) {
      return res.status(404).json({ message: "Instructor Not Found" });
    }

    res.json({
      message: "Instructor Updated Successfully",
      data: updateInstructor,
    });
  } catch (error) {
    // Handle possible errors, such as validation errors or MongoDB operation errors
    res
      .status(400)
      .json({ message: "Error updating instructor", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletionResult = await Instructor.findByIdAndDelete(id);

    if (!deletionResult) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.json({ message: "Instructor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting instructor", error: error.message });
  }
});

router.post("/addInstructor", async (req, res) => {
  try {
    const { body } = req;
    const newPassword = crypto.randomBytes(10).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Create a new Instructor document with all fields from the schema
    const instructor = await Instructor.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      number: body.number,
      totalEarning: body.totalEarning,
      balance: body.balance,
      whatsappNumber: body.whatsappNumber,
      verified: body.verified,
      status: body.status,
      gender: body.gender,
      image: body.image, // Assuming the image is handled as a URL or file path
      imageUrl: body.imageUrl,
      address: {
        street: body.address.street,
        city: body.address.city,
        state: body.address.state,
        postalCode: body.address.postalCode,
      },
      bankDetails: {
        accountNumber: body.bankDetails.accountNumber,
        bankName: body.bankDetails.bankName,
        branch: body.bankDetails.branch,
        transitNumber: body.bankDetails.transitNumber,
        swiftCode: body.bankDetails.swiftCode,
        documents: body.bankDetails.documents, // Assuming this is an array of strings (URLs or file paths)
        documentUrls: body.bankDetails.documentUrls,
      },
      carDetails: {
        carModel: body.carDetails.carModel,
        carYear: body.carDetails.carYear,
        vinNumber: body.carDetails.vinNumber,
        licensePlate: body.carDetails.licensePlate,
      },
    });
    SendMail(body.name, body.email, hashedPassword);

    // Respond with the created instructor's ID and a success message
    res.json({
      message: "Instructor Created Successfully",
      instructorId: instructor._id,
      password: newPassword, // Return the ID of the created instructor
    });
  } catch (error) {
    // Handle errors, e.g., validation errors or database connection issues
    res.status(400).json({
      message: "Error creating instructor",
      error: error.message,
    });
  }
});

module.exports = router;
