// store/reducer/reducer.js

const initialState = { index: 0, name: ""}

function Store(state = initialState, action) {
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

export default Store