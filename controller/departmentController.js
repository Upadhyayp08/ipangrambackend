// controllers/departmentController.js
const Department = require("../model/departmentModel");
const User = require("../model/registerModel");

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find();

    // Fetch employees for each department
    const departmentsWithEmployees = await Promise.all(
      departments.map(async (department) => {
        const employees = await User.find({
          Department: department.name,
        }).select("Name");
        return {
          _id: department._id,
          name: department.name,
          employees: employees.map((employee) => employee.Name),
        };
      })
    );

    res.json(departmentsWithEmployees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createDepartment(req, res) {
  try {
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.json(savedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateDepartment(req, res) {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteDepartment(req, res) {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
