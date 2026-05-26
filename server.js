const studentRoutes = require("./routes/studentRoutes");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const Student = require("./models/Student"); 




// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
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

app.use("/api/students", require("./routes/studentRoutes"));

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
// SERVER
// ======================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 SkillBridge Pro Running`);
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`⚡ Mode   : ${process.env.NODE_ENV || 'development'}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});