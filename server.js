const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  // Corrected: Wrapped in backticks for template literal
  console.log(
    `📌 ${req.method} ${req.url} | ${new Date().toLocaleTimeString()}`
  );
  next();
});

// ======================================
// HTML ROUTES
// ======================================

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

// ======================================
// API ROUTES
// ======================================

app.use("/students", require("./routes/studentRoutes"));

// ======================================
// 404 HANDLER
// ======================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  // Corrected: Added backticks and quotes for the log messages
  console.log(`🚀 SkillBridge Pro Running`);
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`⚡ Mode   : ${process.env.NODE_ENV || 'development'}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});