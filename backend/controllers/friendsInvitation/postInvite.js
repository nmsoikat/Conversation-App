const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadySend = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadySend) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: targetUser._id,
    receiverId: userId,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Already invited");
  }

  // check if the user which we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invitation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user
  friendsUpdates.updateFriendsPendingInvitation(targetUser._id.toString());

  return res.status(200).send("Invitation has been sent");
};

module.exports = postInvite;
