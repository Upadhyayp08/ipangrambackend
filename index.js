const express = require("express");
const app = express();
const cors = require("cors");
const Port = 8080;
const registerRoute = require("./route/registerRoute");
const departmentRoute = require("./route/departmentRoute");
const dbConnect = require("./config/dbConfig");
app.use(cors());
app.use(express.json());

app.use("/registerlogin", registerRoute);
app.use("/", departmentRoute);

app.listen(Port, async () => {
  try {
    await dbConnect;
    console.log("Database Connected Successfully");
    console.log("Server is running on Port", Port);
  } catch (err) {
    console.log(err);
  }
});
