import { LOGOUT, SESSION, USER } from '../actions/server-actions';

const sessionReducer = (state = {}, action) => {
    switch (action.type) {
        case SESSION:
            return action.session;
        case LOGOUT:
            // Removes the user from the session, but keeps other information
            const clearUser = ({user, ...s}) => s;
            return clearUser(state);
        case USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};
export default sessionReducer;