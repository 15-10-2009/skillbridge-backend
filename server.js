const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());
app.use(express.json());

// Custom Request Logger
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
    { id: 1, name: "Teju", course: "MERN Stack", age: 20, email: "teju@example.com" },
    { id: 2, name: "Jeeva", course: "Artificial Intelligence", age: 22, email: "jeeva@example.com" },
    { id: 3, name: "Alex", course: "React Development", age: 21, email: "alex@example.com" },
];

// ======================================
// ROUTES
// ======================================

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/students-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "students.html"));
});
app.get("/add-student", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "addStudent.html"));
});
app.get("/update-student", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "updateStudent.html"));
});
app.get("/delete-student", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "deleteStudent.html"));
});

// GET - Fetch All Students
app.get("/students", (req, res) => {
    res.json({
        success: true,
        message: "Students fetched successfully",
        totalStudents: students.length,
        data: students,
    });
});

// POST - Add New Student
app.post("/students", (req, res) => {
    const { name, course, age, email } = req.body;

    if (!name || !course || !age || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        course,
        age,
        email,
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: newStudent,
    });
});

// PUT - Update Student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, course, age, email } = req.body;

    let student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    if (name) student.name = name;
    if (course) student.course = course;
    if (age) student.age = age;
    if (email) student.email = email;

    res.json({
        success: true,
        message: "Student updated successfully",
        data: student,
    });
});

// DELETE - Remove Student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const exists = students.some((s) => s.id === id);

    if (!exists) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    students = students.filter((s) => s.id !== id);

    res.json({
        success: true,
        message: "Student deleted successfully",
        remainingStudents: students,
    });
});

// ======================================
// START SERVER
// ======================================

app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});