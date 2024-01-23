const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/crudoperation")
  .then(() => {
    console.log("coonect to DB");
    app.listen(8080, () => {
      console.log("server is ruuning");
    });
  })
  .catch((err) => console.log(err));

//read data
//api - http://localhost:8080/
app.get("/", async (req, res) => {
  const data = await EmployeeModel.find({});
  res.json({ success: true, data: data });
});

//create data || save data in mongodb
//api - http://localhost:8080/create
/*
 {
  name,
  email,
  mobile
}
 */
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new EmployeeModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully" });
});

//update data
//api - http://localhost:8080/update
/* {
      id:"",
      name:"",
      email:"",
      mobile:""
    }
*/
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  const data = await EmployeeModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data update successfully", data: data });
});

//delete data
//api - http://localhost:3000/delete/:id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await EmployeeModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data delete successfully", data: data });
});
