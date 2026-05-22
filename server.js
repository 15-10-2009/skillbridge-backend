const express = require("express");
const cors = require("cors");

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
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>SkillBridge Backend</title>

    <style>
      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: Arial, sans-serif;
      }

      body{
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color:white;
        min-height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:40px;
      }

      .container{
        width:100%;
        max-width:900px;
        background: rgba(255,255,255,0.08);
        backdrop-filter: blur(10px);
        border-radius:20px;
        padding:40px;
        box-shadow:0 8px 30px rgba(0,0,0,0.4);
      }

      h1{
        font-size:48px;
        margin-bottom:10px;
        color:#38bdf8;
      }

      p{
        color:#cbd5e1;
        margin-bottom:30px;
      }

      .status{
        display:inline-block;
        padding:10px 20px;
        background:#22c55e;
        border-radius:50px;
        font-weight:bold;
        margin-bottom:30px;
      }

      .grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
        gap:20px;
      }

      .card{
        background:rgba(255,255,255,0.05);
        padding:25px;
        border-radius:15px;
        transition:0.3s;
        border:1px solid rgba(255,255,255,0.1);
      }

      .card:hover{
        transform:translateY(-5px);
        background:rgba(255,255,255,0.1);
      }

      .card h2{
        color:#38bdf8;
        margin-bottom:10px;
      }

      .route{
        background:#0f172a;
        padding:8px 12px;
        border-radius:8px;
        margin-top:10px;
        display:inline-block;
        color:#22c55e;
      }

      .footer{
        margin-top:40px;
        text-align:center;
        color:#94a3b8;
      }

      .btn{
        display:inline-block;
        margin-top:15px;
        padding:12px 20px;
        background:#38bdf8;
        color:white;
        text-decoration:none;
        border-radius:10px;
        transition:0.3s;
      }

      .btn:hover{
        background:#0ea5e9;
      }
    </style>
  </head>

  <body>

    <div class="container">

      <div class="status">
        ✅ Backend Server Running Successfully
      </div>

      <h1>🚀 SkillBridge Backend API</h1>

      <p>
        Advanced Student Management REST API built using
        Node.js, Express.js and deployed on Render.
      </p>

      <div class="grid">

        <div class="card">
          <h2>📚 GET Students</h2>
          <p>Fetch all students from the backend.</p>
          <div class="route">GET /students</div>
        </div>

        <div class="card">
          <h2>➕ POST Student</h2>
          <p>Add a new student to the database.</p>
          <div class="route">POST /students</div>
        </div>

        <div class="card">
          <h2>✏️ UPDATE Student</h2>
          <p>Update student details dynamically.</p>
          <div class="route">PUT /students/:id</div>
        </div>

        <div class="card">
          <h2>🗑️ DELETE Student</h2>
          <p>Remove student records easily.</p>
          <div class="route">DELETE /students/:id</div>
        </div>

      </div>

      <center>
        <a class="btn" href="/students">
          View Live API Data
        </a>
      </center>

      <div class="footer">
        <p>
          Built with ❤️ using Node.js + Express + Render
        </p>
      </div>

    </div>

  </body>
  </html>
  `);
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