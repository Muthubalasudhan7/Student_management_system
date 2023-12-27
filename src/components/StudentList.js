// src/components/StudentList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import './StudentList.css';
import '@fortawesome/fontawesome-free/css/all.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control modal visibility
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students');
      console.log(response.data);
      setStudents(response.data);
      setFilteredStudents(response.data); 
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from the backend when the component mounts


    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);

    // Filter students based on the input value
    const filtered = students.filter(
      (student) =>
        student.first_name.toLowerCase().includes(value.toLowerCase()) ||
        student.last_name.toLowerCase().includes(value.toLowerCase()) ||
        student.location.toLowerCase().includes(value.toLowerCase()) ||
        student.email.toLowerCase().includes(value.toLowerCase()) ||
        student.formatted_dob.includes(value) ||
        student.education.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredStudents(filtered);
  };

  // --------------------- CODE TO HANDLE THE EDIT ICON WHEN CLICKED ---------------------------------------------------
  const navigate = useNavigate();

  const handleEdit = (studentId) => {
    // Navigate to the edit route with the student's ID
    navigate(`/edit-student/${studentId}`);
  };

  // --------------------- CODE TO HANDLE THE DELETE ICON WHEN CLICKED ---------------------------------------------------

  const handleDeleteClick = (studentId) => {
    // Show the delete confirmation modal
    setShowDeleteModal(true);
    setSelectedStudentId(studentId);
  };

  const handleDeleteConfirm = async () => {
    // Send DELETE request if user confirms
    try {
      await axios.delete(`http://localhost:3001/students/${selectedStudentId}`);
      // Update the student list after deletion
      fetchData();
      // Close the delete confirmation modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleDeleteCancel = () => {
    // Close the delete confirmation modal without performing the delete operation
    setShowDeleteModal(false);
    setSelectedStudentId(null);
  };

  return (
    <div className="student-list-container">
      <h2>Student Management System</h2>

      <div className="filter-container">
      <div className="filter-input">
        <input
          type="text"
          placeholder="Search..."
          value={filterValue}
          onChange={handleFilterChange}
        />
        <FaSearch className="search-icon" />
      </div>

      <Link to="/add-student">
        <button className="add-button">Add</button>
      </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Education</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {filteredStudents.map((student, index) => (
            <tr key={student.Id}>
              <td>{index + 1}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.location}</td>
              <td>{student.email}</td>
              <td>{student.formatted_dob}</td>
              <td>{student.education}</td>
              <td>
                <i className="fas fa-edit edit-icon" onClick={() => handleEdit(student.Id)}></i>
                <span style={{ color: '#007bff', cursor:'pointer' }} onClick={() => handleEdit(student.Id)}>Edit</span>
              </td>
              <td>
                <i className="fas fa-trash-alt delete-icon" onClick={() => handleDeleteClick(student.Id)}></i>
                <span style={{ color: 'red', cursor:'pointer' }} onClick={() => handleDeleteClick(student.Id)}>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteModal
        show={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
    
  );
};

export default StudentList;
