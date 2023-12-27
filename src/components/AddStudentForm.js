// src/components/AddStudentForm.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AddStudentForm.css';
// import CustomDatePicker from './CustomDatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { format, parse  } from 'date-fns';


const AddStudentForm = ({ onAddStudent, editMode }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [education, setEducation] = useState('');
    const [location, setLocation] = useState('');
    const [about, setAbout] = useState('');
    const [error, setError] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    
    useEffect(() => {
      // If the component is in edit mode (ID is present in params), fetch the student data
      if (id) {
        fetchStudentData();
      }
    }, [id]);

    const fetchStudentData = async () => {
      console.log("fetchstudent function called");
      try {
        const response = await axios.get(`http://localhost:3001/students/${id}`);
        const student = response.data[0];

        console.log("fetchstudent data",student);
  
        setFirstName(student.first_name);
        setLastName(student.last_name);
        setEmail(student.email);

        setDob(student.formatted_dob ? parse(student.formatted_dob, 'dd-MM-yyyy', new Date()) : null);
        // setDob(student.date_of_birth ?? null);
        // setDob(student.date_of_birth);
        // setDob(student.formatted_dob ? new Date(student.formatted_dob) : null);
        // setDob(student.date_of_birth ? new Date(student.date_of_birth) : '');
        setEducation(student.education);
        setLocation(student.location);
        setAbout(student.about);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data');
      }
    };

    const handleSave = async () => {
      try {
        const formattedDate = dob ? format(dob, 'yyyy-MM-dd') : null;

        if (id) {
          // If in edit mode, send a PUT request to update the student
          await axios.put(`http://localhost:3001/students/${id}`, {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: formattedDate,
            email,
            education,
            location,
            about,
          });
        } else {


          // If not in edit mode, send a POST request to add a new student
          await axios.post('http://localhost:3001/students', {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: formattedDate,
            email,
            education,
            location,
            about,
          });
        }
  
        navigate('/student-list');
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

  const handleBack = () => {
    // Navigate back to the student list
    resetForm();
    navigate('/student-list');
  };

  const resetForm = () => {
    // Reset form fields
    setFirstName('');
    setLastName('');
    setDob('');
    setEmail('');
    setEducation('');
    setLocation('');
    setAbout('');
  };

  const handleDobClick = () => {
    setShowDatePicker(true);
  };
  
  // const handleDatePickerChange = (date) => {
  //   setDob(date);

  //   setShowDatePicker(false);
  // };

  return (
    <div>
    <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={handleBack} />

      <h2 className='heading'>{editMode ? 'Edit Student Details' : 'Add Student Details'}</h2>

    <div className='form-container'>
      <form>
      <div className="form-row">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder='Enter your first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder='Enter your last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>

      <div className="form-row">

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

            <label htmlFor='dob'>Date of Birth:</label>
            <div className="datepicker-container">
              <DatePicker 
                id='dob'
                selected={dob}
                onChange={(date) => setDob(date)}
                placeholderText='dd/mm/yyyy'
                dateFormat='dd/MM/yyyy'
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
              />
            </div>
          </div>

        <div className="form-row">
        <label htmlFor="education">Education:</label>
        <input
          type="text"
          id="education"
          placeholder='Enter your education'
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          placeholder='Enter your location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        </div>

        <div className="form-row">
        <label htmlFor="about">About:</label>
        <textarea
          id="about"
          placeholder='Enter your details'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        </div>

        <button type="button" className='add-student-button' onClick={handleSave}>
        {editMode ? 'Update' : 'Submit'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      </div>

    </div>
  );
};

export default AddStudentForm;
