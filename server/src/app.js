const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')

const authRouter = require('../routes/auth.route');
const facultyRouter = require('../routes/faculty.route');
const reviewRouter = require('../routes/review.route');

const app = express();

app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors())
app.use(morgan('combined'));



app.use('/auth', authRouter);
app.use('/faculty', facultyRouter);
app.use('/reviews', reviewRouter);



module.exports = app