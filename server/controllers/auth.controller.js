const User = require('../models/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Rate } = require('../models/faculty.model')



// Register user
async function registerUser (req, res) {
    try {
        const { 
            firstName, 
            lastName, 
            rollNumber, 
            email, 
            phone, 
            password, semester, department} = req.body

            // console.log(req.file)

        const user = await User.findOne({rollNumber: rollNumber})
        if (user) {
            return res.json({message: 'User already exists', status: false})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            rollNumber: Number(rollNumber),
            email: email,
            phone: phone,
            password: hashedPassword,
            semester: semester,
            // photo,
            department: department,
            role: "student"
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Login User
async function loginUser (req, res) {
    try {
        const { rollNumber, password } = req.body
        const user = await User.findOne({rollNumber: rollNumber})
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


// get all students

async function getAllStudents(req, res) {
    try {
        const students = await User.find({})
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// GET user
async function getUser (req, res) {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// UPDATE a user
async function updateUser (req, res) {
    try {
        const data = req.body
        const {userId} = req.params
        const user = await User.findByIdAndUpdate(userId, data, { new: true})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// DELETE a user
async function deleteUser (req, res) {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// GET all rates
async function getAllRates (req, res) {
    try {
        const rates = await Rate.find({})
        res.status(200).json(rates)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// Forgot password for students
async function resetPassword(req, res) {
    try {
        const { rollNumber, password,  } = req.body;
        console.log(rollNumber, password);

        // Check if rollNumber and newPassword are provided
        if (!rollNumber || !password) {
            return res.status(400).json({ error: 'Roll number and new password are required.' });
        }

        // Find the user by rollNumber
        const student = await User.findOne({ rollNumber });

        // Check if the user exists
        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update the password
        student.password = hashedPassword;
        await student.save();

        res.status(200).json({ message: 'Password reset successful.', status: 'success'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = {registerUser, loginUser, 
    updateUser, deleteUser,
     getAllRates, getAllStudents, getUser, resetPassword}