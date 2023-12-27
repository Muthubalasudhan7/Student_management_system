const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// CODE FOR MYSQL DATABASE CONNECTION
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  port:'3306',
  database: 'student_management'
});

// CODE TO CHECK WHETHER THE DB IS CONNECTED OR NOT
db.connect(err => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

//========================= POST METHOD TO CHECK WHETHER THE USER EXIST'S OR NOT ===================================================================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  });
});

//========================= POST METHOD TO ADD A NEW STUDENT TO THE DB ===========================================================================
app.post('/students', (req, res) => {
  console.log("data for insert",req.body);
  const {
    first_name,
    last_name,
    date_of_birth,
    email,
    education,
    location,
    about,
  } = req.body;

  const insertQuery = `
    INSERT INTO students
    (first_name, last_name, date_of_birth, email, education, location, about)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertQuery,
    [first_name, last_name, date_of_birth, email, education, location, about],
    (err, result) => {
      if (err) {
        console.error('Error adding student:', err);
        res.status(500).json({ message: 'Failed to add student' });
      } else {
        console.log('Student added successfully');
        res.status(200).json({ message: 'Student added successfully' });
      }
    }
  );
});

//============================== GET METHOD TO FETCH ALL STUDENTS LIST ========================================================================
app.get('/students', (req, res) => {
    console.log("student list end point is called");
    // Retrieve the list of students from the database
    db.query(`SELECT
    Id,
    first_name,
    last_name,
    location,
    email,
    DATE_FORMAT(date_of_birth, '%d-%m-%Y') AS formatted_dob,
    education
  FROM students
  WHERE is_delete = 0;`, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // console.log(results);
      res.json(results);
    });
  });

// =================================== GET METHOD TO FETCH THE PARTICULAR STUDENT DATA FOR AUTO-FILLINNG THE FORM==============================================
  app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    console.log("one student data end point is called");
    db.query(`SELECT
    Id,
    first_name,
    last_name,
    location,
    email,
    DATE_FORMAT(date_of_birth, '%d-%m-%Y') AS formatted_dob,
    education,
    about
  FROM students
  WHERE Id = ?`,[studentId], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      console.log(results);
      res.json(results);
    });
  });

// ================================== PUT METHOD TO UPDATE THE STUDENT DATA BASED ON THE ID =======================================================
  app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const {
      first_name,
      last_name,
      date_of_birth,
      email,
      education,
      location,
      about,
    } = req.body;

    console.log("req body update",req.body);
  
    const updateQuery = `
      UPDATE students
      SET
        first_name = ?,
        last_name = ?,
        date_of_birth = ?,
        email = ?,
        education = ?,
        location = ?,
        about = ?
      WHERE Id = ?
    `;
  
    db.query(
      updateQuery,
      [first_name, last_name, date_of_birth, email, education, location, about, studentId],
      (err, result) => {
        if (err) {
          console.error('Error updating student:', err);
          res.status(500).json({ message: 'Failed to update student' });
        } else {
          console.log('Student updated successfully');
          res.status(200).json({ message: 'Student updated successfully' });
        }
      }
    );
  });

// =========================== DELETE METHOD TO SOFT-DELETE THE STUDENT BASED ON THE ID ======================================================
  app.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    console.log("student ID for delete",studentId);
  
    try {
      const updateStudentQuery = 'UPDATE students SET is_delete = 1 WHERE Id = ?';
      db.query(updateStudentQuery, [studentId]);
  
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
