const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const joi = require('joi')
const expressJoiValidator = require('express-joi-validation').createValidator({}) //empty configuration option
const {protect} = require("../middlewares/Auth")

//create validation schema using joi
const registerValidationSchema = joi.object({
  username: joi.string().min(3).max(10).required(),
  password: joi.string().min(6).max(20).required(),
  email: joi.string().email().required()
})

const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required()
})




router.route('/register').post(expressJoiValidator.body(registerValidationSchema), authController.postRegister.register)

router.route('/login').post(expressJoiValidator.body(loginValidationSchema), authController.postLogin.login)

router.route('/admin').get(protect, (req, res) => {
  res.send("success")
})

module.exports = router