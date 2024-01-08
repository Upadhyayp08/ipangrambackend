const User = require("../model/registerModel");

exports.registerUser = async (req, res) => {
  const { Name, Email, Password, City, Role } = req.body;
  const lowercasedEmail = Email.toLowerCase(); // Convert email to lowercase

  try {
    const existingUser = await User.findOne({ Email: lowercasedEmail });

    if (existingUser) {
      return res.status(409).json({
        ResponseCode: "Email already exists",
        ResponseData: existingUser,
      });
    }

    const registerdata = new User({
      Name,
      Email: lowercasedEmail,
      Password,
      City,
      Role,
    });
    const registersuccess = await registerdata.save();

    res.status(200).json({
      ResponseCode: "Success",
      ResponseData: registersuccess,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    // Find the user by email and password
    const user = await User.findOne({ Email, Password });

    if (user) {
      // User found, authentication successful
      return res.status(200).json({ message: "Login successful", user });
    } else {
      // User not found or credentials are incorrect
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    // Extract sorting criteria from request, if present
    const { sortBy, sortOrder = "asc" } = req.query || {};

    // Validate sorting criteria if provided
    if (sortBy && !["Name", "City"].includes(sortBy)) {
      return res.status(400).json({ message: "Invalid sorting criteria" });
    }

    // Query users with Role "employee" and apply sorting if specified
    const employees = await User.find({ Role: "Employee" }).sort(
      sortBy ? { [sortBy]: sortOrder } : {}
    );

    res.status(200).json({
      ResponseCode: "Success",
      ResponseData: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findById(id); // Check before deletion

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.Role !== "Employee") {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }

    await User.findByIdAndDelete(id); // Actual deletion

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, City, Role, Department } = req.body; // Assuming only these fields are updatable

    const existingEmployee = await User.findById(id); // Check before update

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (existingEmployee.Role !== "Employee") {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }

    const updatedEmployee = await User.findByIdAndUpdate(
      id,
      {
        Name,
        Email,
        City,
        Role,
        Department,
      },
      { new: true }
    );
    console.log("After Update:", updatedEmployee);
    res.status(200).json({
      ResponseCode: "Success",
      ResponseData: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
