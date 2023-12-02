const {Faculty, Subject} = require('../models/faculty.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




// Get all the faculties
async function getAllFaculty (req, res,) {
    try {
        const faculties = await Faculty.find()
        res.status(200).json(faculties)
    } catch (error) {
        res.status(400).json(error)
    }
}


// Get all subjects
async function getAllSubjects (req, res) {
    try {
        const subjects = await Subject.find()
        res.status(200).json(subjects)
    } catch (error) {
        res.status(400).json(error)
    }
}

// Create a new subject
async function createSubject (req, res) {
    try {
        const { name, semester, department, code, teacher} = req.body
        console.log(name)
        if(!semester || !name || !department) {
            return res.status(400).json({message:'All fields are required'})
        }


        const subject = await Subject.findOne({name: name})
        if(subject) {
            return res.status(200).json({ message: 'Subject already exists' })
        }

        const newSubject = new Subject({ name: name, code: Number(code), teacher: teacher, semester: Number(semester), department})
        const savedSubject =  await newSubject.save()
        res.status(201).json(savedSubject)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// register a new faculty
async function registerFaculty (req, res) {
    try {
        const { 
            fullName,
            email, 
            phone, 
            password, department, role} = req.body

        const user = await Faculty.findOne({email: email})

        if (user) {
            return res.json({message: 'User already exists', status: false})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newFaculty = new Faculty({
            fullName: fullName,
            email: email,
            phone: phone,
            password: hashedPassword,
            department: department,
            role: role
        })

        const savedUser = await newFaculty.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


// Login faculty
async function loginFaculty (req, res) {
    try {
        const { email, password } = req.body
        const user = await Faculty.findOne({email: email})

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({message: 'Invalid password', status: false})
        }
        const token = jwt.sign({user}, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600
        })

        res.status(200).json({
            token: token
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


// update faculty
async function updateFaculty (req, res) {
    try {
        const data = req.body
        const { id } = req.params
        const faculty = await Faculty.findByIdAndUpdate(id, data, { new: true})
        res.status(200).json(faculty, { message: 'Updated successfully'})
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Delete faculty
async function deleteFaculty (req, res) {
    try {
        const { id } = req.params
        const faculty = await Faculty.findByIdAndDelete(id)

        if(!faculty) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(faculty)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


// Delete faculty
async function deleteSubject (req, res) {
    try {
        const { id } = req.params
        const subject = await Subject.findByIdAndDelete(id)
        res.status(200).json(subject)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// GET faculty

async function getFaculty (req, res) {
    try {
        const { id } = req.params
        const faculty = await Faculty.findById(id)
        res.status(200).json(faculty)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Forgot password for students
async function resetPassword(req, res) {
    try {
        const { email, password,  } = req.body;

        // Check if rollNumber and newPassword are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and new password are required.' });
        }

        // Find the user by rollNumber
        const faculty = await Faculty.findOne({ email });

        // Check if the user exists
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found.' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update the password
        faculty.password = hashedPassword;
        await faculty.save();

        res.status(200).json({ message: 'Password reset successful.', status: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}




module.exports = {
    registerFaculty, loginFaculty,
     getAllFaculty, createSubject, 
     getAllSubjects, updateFaculty,
     deleteFaculty, deleteSubject,
     getFaculty, resetPassword
     }