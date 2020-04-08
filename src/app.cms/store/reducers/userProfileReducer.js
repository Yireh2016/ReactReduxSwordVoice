const initialState = {
  userProfile: {}
}
//estado inicial viene del CONFIG REDUCER.JS
const userProfileReducer = (state = initialState, action) => {
  let newState = state

  switch (action.type) {
    case 'SET_USER_PROFILE': {
      newState.userProfile = action.payload
      break
    }

    default:
      break
  }

  return newState
}

export default userProfileReducer
