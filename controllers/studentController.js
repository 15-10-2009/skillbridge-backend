const Student = require("../models/Student");

// ======================================
// GET ALL STUDENTS
// ======================================
const getStudents = async (req, res) => {
  try {
    // Fetches all students and sorts by newest first
    const students = await Student.find().sort({ createdAt: -1 });

    /**
     * CRITICAL FIX: 
     * We send 'students' (the array) directly.
     * This allows your students.html to use: result.map(...)
     */
    res.status(200).json(students);
    
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// CREATE STUDENT
// ======================================
const createStudent = async (req, res) => {
  try {
    // req.body contains the data from your Add Student form
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("❌ Error creating student:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE STUDENT
// ======================================
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // returns the updated document
        runValidators: true, // ensures the update follows Model rules
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE STUDENT
// ======================================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};