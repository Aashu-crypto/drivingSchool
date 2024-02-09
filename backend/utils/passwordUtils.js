const crypto = require("crypto");

const generatePassword = function () {
  const pas = crypto.randomBytes(10).toString("hex");
  console.log(pas);
};

generatePassword();
