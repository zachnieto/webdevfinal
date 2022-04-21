import { LOGOUT, SESSION, USER } from '../actions/server-actions';

const sessionReducer = (state = {}, action) => {
    // console.log(state)
    switch (action.type) {
        case SESSION:
            return action.session;
        case LOGOUT:
            return {}
        case USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}
export default sessionReducer;