const sessionReducer = (state = {}, action) => {
    console.log(state)
    switch (action.type) {
        case 'SESSION':
            return action.session;
        case 'LOGOUT':
            return {}
        default:
            return state;
    }
}
export default sessionReducer;