import { openAlertMessage } from './alertActions'
import * as api from '../../api'

export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATIONS: "FRIENDS.SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS"
}

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) => {
      return dispatch(sendFriendInvitation(data, closeDialogHandler))
    },
    acceptFriendInvitation: (data, closeDialogHandler) => dispatch(acceptFriendInvitation(data, closeDialogHandler)),
    rejectFriendInvitation: (data, closeDialogHandler) => dispatch(rejectFriendInvitation(data, closeDialogHandler))
  }
}

export const setPendingFriendsInvitation = (pendingInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendsInvitations: pendingInvitations

  }
}

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends
  }
}

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data)

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation has been sent"))
      closeDialogHandler()
    }
  }
}

const acceptFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data)

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation accepted"))
      closeDialogHandler()
    }
  }
}

const rejectFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data)

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation rejected"))
      closeDialogHandler()
    }
  }
}