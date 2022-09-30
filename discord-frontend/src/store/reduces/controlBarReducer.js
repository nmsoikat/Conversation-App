import { controlBarActions } from "../actions/controlBarActions";

const initState = {
  isFriendsBarVisible: true
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case controlBarActions.TOGGLE_FRIENDS_BAR:
      return {
        isFriendsBarVisible: action.payload
      }
    default:
      return state
  }
}

export default reducer;