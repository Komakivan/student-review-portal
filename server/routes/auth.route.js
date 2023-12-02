const express = require('express');
const multer = require('multer');
const path = require('path');
const {registerUser, loginUser, updateUser, 
  deleteUser, getAllRates, getAllStudents, getUser, resetPassword} = require('../controllers/auth.controller')



/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });


//   const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
  const upload = multer({ storage });

const authRouter = express.Router();

authRouter.post('/register', upload.single('photo'), registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/update', updateUser);
authRouter.delete('/delete/:id', deleteUser);
authRouter.get('/rates', getAllRates)
authRouter.get('/students', getAllStudents)
authRouter.get('/students/:id',getUser )
authRouter.put('/reset-password', resetPassword)

module.exports = authRouter;

