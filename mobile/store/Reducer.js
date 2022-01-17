// Store/Reducers/favoriteReducer.js

const initialState = { index: 0, name: ""}

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'index':
      nextState = {
        ...state,
        index: action.value
      }
    return nextState || state
    case 'name':
      nextState = {
        ...state,
        name: action.value
      }
    return nextState || state
  default:
    return state
  }
}

export default toggleFavorite
