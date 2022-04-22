import { combineReducers } from 'redux'
import gameReducer from './game-reducer';
import sessionReducer from "./session-reducer";

export default combineReducers({
    gameReducer,
    sessionReducer
})