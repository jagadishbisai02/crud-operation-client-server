const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("user", EmployeeSchema);

module.exports = EmployeeModel;
