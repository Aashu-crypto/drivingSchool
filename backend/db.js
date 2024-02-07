const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ashugandotra14:aashu@cluster0.rnvjzsv.mongodb.net/"
);
const { Schema } = mongoose;

const instructorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: String,
    totalEarning: Number,
    balance: Number,
    whatsappNumber: String,
    verified: String,
    status: String,
    gender: String,
    image: String, // Assuming image will be stored as a URL or file path
    imageUrl: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    bankDetails: {
      accountNumber: String,
      bankName: String,
      branch: String,
      transitNumber: String,
      swiftCode: String,
      documents: [String], // Assuming documents are stored as URLs or file paths
      documentUrls: [String],
    },
    carDetails: {
      carModel: String,
      carYear: Number, // Assuming carYear is a year, it should be a number
      vinNumber: String,
      licensePlate: String,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = {
  Instructor,
};
