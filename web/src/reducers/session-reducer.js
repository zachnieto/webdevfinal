const sessionReducer = (state = {}, action) => {
    console.log(state);
    switch (action.type) {
        case 'SESSION':
            return action.session;
        case 'LOGOUT':
            // Removes the user from the session, but keeps other information
            const clearUser = ({user, ...s}) => s;
            return clearUser(state);
        case 'USER':
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};
export default sessionReducer;