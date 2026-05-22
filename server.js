const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// MIDDLEWARE
// ======================================

// Enable CORS
app.use(cors());

// Parse JSON data
app.use(express.json());

// Custom Request Logger Middleware
app.use((req, res, next) => {
    console.log(
        `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`
    );
    next();
});

// ======================================
// SAMPLE DATABASE (ARRAY)
// ======================================

let students = [
  {
    id: 1,
    name: "Teju",
    course: "MERN Stack",
    age: 20,
    email: "teju@example.com",
  },
  {
    id: 2,
    name: "Jeeva",
    course: "Artificial Intelligence",
    age: 22,
    email: "jeeva@example.com",
  },
  {
    id: 3,
    name: "Alex",
    course: "React Development",
    age: 21,
    email: "alex@example.com",
  },
];

// ======================================
// ROUTES
// ======================================

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 SkillBridge Backend API Running</h1>
    <p>Use <b>/students</b> to access student data.</p>
  `);
});

// ======================================
// GET - Fetch All Students
// ======================================

app.get("/students", (req, res) => {
  res.json({
    success: true,
    message: "Students fetched successfully",
    totalStudents: students.length,
    data: students,
  });
});

// ======================================
// POST - Add New Student
// ======================================

app.post("/students", (req, res) => {
  const { name, course, age, email } = req.body;

  // Validation
  if (!name || !course || !age || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Create New Student
  const newStudent = {
    id: students.length > 0
      ? students[students.length - 1].id + 1
      : 1,
    name,
    course,
    age,
    email,
  };

  // Add to array
  students.push(newStudent);

  // Response
  res.status(201).json({
    success: true,
    message: "Student added successfully",
    data: newStudent,
  });
});

// ======================================
// PUT - Update Student
// ======================================

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const { name, course, age, email } = req.body;

  // Find student
  let student = students.find((s) => s.id === id);

  // Check student exists
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // Update fields
  if (name) student.name = name;
  if (course) student.course = course;
  if (age) student.age = age;
  if (email) student.email = email;

  // Response
  res.json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

// ======================================
// DELETE - Remove Student
// ======================================

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const exists = students.some((s) => s.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Student not found" });
  }

  students = students.filter((s) => s.id !== id);

  res.json({
    message: "Student deleted successfully",
    allStudents: students,
  });
});
  // Check if student exists
  const studentExists = students.some((s) => s.id === id);

  if (!studentExists) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // Delete student
  students = students.filter((s) => s.id !== id);

  // Response
  res.json({
    success: true,
    message: "Student deleted successfully",
    remainingStudents: students,
  });


// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {
console.log(`🚀 Backend running at http://localhost:${PORT}`);
});