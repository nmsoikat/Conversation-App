const express = require('express')
const router = express.Router()
const joi = require('joi')
const expressJoiValidator = require('express-joi-validation').createValidator({}) //empty configuration option
const { protect } = require("../middlewares/Auth")
const friendInvitationController = require('../controllers/friendsInvitation/friendsInvitationController')

//create validation schema using joi
const loginValidationSchema = joi.object({
  targetMailAddress: joi.string().email().required(),
  password: joi.string().min(6).max(20).required()
})

router.route('/invite').post(protect, friendInvitationController.postInvite)


module.exports = router;
