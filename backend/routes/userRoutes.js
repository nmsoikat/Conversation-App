const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const joi = require('joi')
const expressJoiValidator = require('express-joi-validation').createValidator({}) //empty configuration option
const {protect} = require("../middlewares/Auth")
const { upload } = require('../utils/uploadFile')

//create validation schema using joi
const updateUserNameSchema = joi.object({
  userId: joi.string().required(),
  username: joi.string().min(3).max(20).required()
})

router.route('/update-username').put(protect, expressJoiValidator.body(updateUserNameSchema), userController.updateUsername)
router.route('/update/profile-img').put(upload.single("profileImg"), protect, userController.updateUserProfileImage)


module.exports = router