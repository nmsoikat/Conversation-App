const express = require('express')
const router = express.Router()
const Joi = require('joi')
const expressJoiValidator = require('express-joi-validation').createValidator({}) //empty configuration option
const { protect } = require("../middlewares/Auth")
const friendInvitationController = require('../controllers/friendsInvitation/friendsInvitationController')

//create validation schema using joi
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.route('/invite').post(protect, expressJoiValidator.body(postFriendInvitationSchema), friendInvitationController.postInvite)


router.post("/accept", protect, expressJoiValidator.body(inviteDecisionSchema), friendInvitationController.postAccept);

router.post("/reject", protect, expressJoiValidator.body(inviteDecisionSchema), friendInvitationController.postReject);

module.exports = router;
