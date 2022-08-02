const initState = {
  userDetails: null
}

const reducer = (state = initState, action) => {
  switch(action.type){
    case "DDD":
      return {}
    default:
      return state
  }
}


export default reducer;