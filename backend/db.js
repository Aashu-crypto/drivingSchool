const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ashugandotra14:aashu@cluster0.rnvjzsv.mongodb.net/");

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String, // Assuming 'Number' is a string, change to Number if it's intended to be a numeric field
    required: true,
  },
  totalEarning: {
    type: Number, // Assuming 'Total Earning' is a numeric field
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  whatsappNumber: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false, // Assuming isVerified is a boolean, defaulting to false
  },
  status: {
    type: String,
  },
});

const Instuctor = mongoose.model("Instructor", instructorSchema);
module.exports = {
  Instuctor,
};
