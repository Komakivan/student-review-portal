const Review = require('../models/review.model')
const User = require('../models/auth.model')
const {Subject} = require('../models/faculty.model')


async function createReview (req, res) {
    try {
        const {one,two,three,four,five,six,seven,eight,
            nine,ten,eleven,twelve, reason, teacher, subject} = req.body
        const { userId } = req.params

        const user = await User.findById(userId)
        const sub = await Subject.findOne({name: subject})
        const rev = await Review.find({subject: subject})
        const rollNumber = user.rollNumber

        console.log(rev)

        for(let item of rev) {
            if(item.author === rollNumber) {
                if(item.subject === subject) {
                    return res.json({status: false, message: 'review already exists'})
                }
            }
        }
        // if(rev) {
        //     if(rev.author === rollNumber) {
        //         return res.json({status: false, message: 'review already exists'})
        //     }
        // }



        if(sub.teacher === teacher) {
            const newReview = await Review({
                1:one, 2:two, 3:three,
                4:four, 5:five,6:six, 7:seven,
                8:eight, 9:nine,10:ten, 11:eleven,
                12:twelve, author: rollNumber,
                reason, teacher, subject
            })
    
            const savedReview = await newReview.save()
            res.status(201).json(savedReview)
        } else {
            res.json({status: false, message: 'You have chosen a wrong subject'})
        }

        // console.log(rollNumber)

      
    } catch (error) {
         res.status(400).json({
            message: error.message
        })
    }
}

// Get all reviews

async function getReviews (req, res) {
    try {
        const reviews = await Review.find({})
        if(reviews) {
            return res.status(200).json(reviews)
        } else {
            res.status(404).json('No reviews found');
        }
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = { createReview, getReviews }