const express = require('express');
const {registerFaculty, loginFaculty,
     getAllFaculty, createSubject, 
     getAllSubjects, updateFaculty, 
     deleteFaculty , deleteSubject, resetPassword, getFaculty} = require('../controllers/faculty.controller')


const facultyRouter = express.Router();

facultyRouter.post('/register', registerFaculty);
facultyRouter.post('/login', loginFaculty);
facultyRouter.get('/faculties', getAllFaculty)
facultyRouter.post('/new-subject', createSubject)
facultyRouter.get('/subjects', getAllSubjects)
facultyRouter.put('/update-faculty/:id', updateFaculty)
facultyRouter.delete('/delete-faculty/:id', deleteFaculty)
facultyRouter.delete('/delete-subject/:id', deleteSubject)
facultyRouter.get('/:id', getFaculty)
facultyRouter.put('/reset-password', resetPassword)

module.exports = facultyRouter;

// TODO: create a new login form for faculty

