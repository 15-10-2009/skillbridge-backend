const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const Student = require("./models/Student"); 

// Import Routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes"); // <-- Integrated from your trailing line

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skillbridge";
if (!process.env.MONGO_URI) {
  console.warn(
    "⚠️ MONGO_URI not set. Falling back to local MongoDB:",
    MONGO_URI
  );
}

// Connect to MongoDB
connectDB(MONGO_URI).then(() => {
    // 🌱 AUTO-SEEDER: Adds sample students if the database is empty
    seedDatabase();
});

const app = express();

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());
app.use(express.json());

/** * Static Files Middleware
 * This ensures that CSS, Images, and Client-side JS 
 * stored in the 'views' folder are accessible to the browser.
 */
app.use(express.static(path.join(__dirname, "views")));

// Request Logger
app.use((req, res, next) => {
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

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes); // <-- Integrated from your trailing line

// ======================================
// /students SHORTHAND ROUTES (for Postman at localhost:3000/students)
// ======================================

// GET student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const Student = require("./models/Student");
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST - create a new student
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

// PUT - update a student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE - delete a student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

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
// SEEDER FUNCTION
// ======================================

async function seedDatabase() {
  try {
    const count = await Student.countDocuments();
    if (count === 0) {
      console.log("🌱 Database is empty. Adding sample students...");
      await Student.create([
        {
          name: "Arjun Mehta",
          course: "Full Stack Web Dev",
          age: 24,
          email: "arjun@example.com",
          learningStatus: "Intermediate"
        },
        {
          name: "Sara Williams",
          course: "Data Science",
          age: 21,
          email: "sara@example.com",
          learningStatus: "Beginner"
        },
        {
          name: "Michael Chen",
          course: "Cyber Security",
          age: 30,
          email: "michael@example.com",
          learningStatus: "Advanced"
        }
      ]);
      console.log("✅ Sample students added!");
    }
  } catch (error) {
    console.log("⚠️ Seeding skipped or error:", error.message);
  }
}

// ======================================
// SERVER START (Always kept at the bottom)
// ======================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 SkillBridge Pro Running`);
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`⚡ Mode   : ${process.env.NODE_ENV || 'development'}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});