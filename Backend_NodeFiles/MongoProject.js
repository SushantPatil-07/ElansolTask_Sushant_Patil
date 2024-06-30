const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 9000;

const mongoURI = 'mongodb://127.0.0.1:27017/MyData';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } 
});

const Student = mongoose.model('Student', studentSchema, 'LoginData');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const studentData = req.body;

  try {
    const newStudent = new Student(studentData);
    await newStudent.save();

    return res.json({ success: true, message: 'Registration successful', data: newStudent });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, message: 'Error during registration' });
  }
});

app.get('/login', async (req, res) => {
  const { username, password } = req.query;

  try {
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Username not found', result: 0 });
    }

    if (student.password === password) {
      return res.json({ success: true, message: 'Login successful', data: student, result: 1 });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password', result: 0 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Error during login', result: 0 });
  }
});


app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    return res.json({ success: true, message: 'Fetched all students', data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ success: false, message: 'Error fetching students' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
