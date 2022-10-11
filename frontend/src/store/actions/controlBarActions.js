export const controlBarActions = {
  TOGGLE_FRIENDS_BAR: "FRIENDS_BAR.TOGGLE_FRIENDS_BAR",
}

export const getActions = (dispatch) => {
  return {
    toggleFriendsBar: (toggleValue) => dispatch(toggleFriendsBar(toggleValue))
  }
}

export const toggleFriendsBar = (toggleValue) => {
  return {
    type: controlBarActions.TOGGLE_FRIENDS_BAR,
    payload: toggleValue,
  }
}
