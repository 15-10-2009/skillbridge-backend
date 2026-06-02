const fs = require('fs');
let content = fs.readFileSync('server.js', 'utf8');

const oldBlock = `app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});`;

const newBlock = `// ======================================
// /students SHORTHAND ROUTES (for Postman at localhost:3000/students)
// ======================================

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
});`;

// Normalize line endings for matching
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedOld = oldBlock.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedOld)) {
  const updated = normalizedContent.replace(normalizedOld, newBlock);
  fs.writeFileSync('server.js', updated, 'utf8');
  console.log('SUCCESS: File updated');
} else {
  console.log('ERROR: Old block not found');
}
