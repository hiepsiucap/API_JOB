const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const { register, login, unpdateUser } = require('../controllers/auth')
const testUser = require('../middleware/testUser')
const rateLimiter = require('express-rate-limit');
const appLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Too many request from this IP, please try again after 15 minutes'
    }
})
router.post('/register', appLimiter, register)
router.post('/login', appLimiter, login)
router.patch('/updateUser', authenticateUser, testUser, unpdateUser)
module.exports = router
