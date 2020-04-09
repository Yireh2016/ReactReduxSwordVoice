const initialState = {
  device: 'pc'
}
//estado inicial viene del CONFIG REDUCER.JS
const resize = (state = initialState, action) => {
  let newState = state

  switch (action.type) {
    case 'SET_DEVICE': {
      newState.device = action.payload
      break
    }
  }

  return newState
}

export default resize
