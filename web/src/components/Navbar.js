import React from "react";
import {FaUser, FaList} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/server-actions";

const Navbar = () => {

    const session = useSelector(state => state.sessionReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOut = async () => {
        await logout(dispatch)
        navigate('/')
    }

    const logIn = () => {
        navigate('/login')
    }


    return (
        <ul className="nav nav-pills">
            {console.log(session)}
            <li className="nav-item ms-auto p-4">
                <a className="nav-link" href="/"> <AiOutlineHome style={{fontSize: "1.2em", marginBottom: "6px"}}/>Home</a>
            </li>
            <li className="nav-item p-4">
                <a className="nav-link" href="/search"><FaList style={{fontSize: "1.2em", marginBottom: "6px"}}/>Search</a>
            </li>
            {!("user" in session) ?
                <li className="nav-item p-4 pe-5">
                    <a className="nav-link wd-button" onClick={logIn}><FaUser style={{fontSize: "1.2em", marginBottom: "6px"}} /> Login</a>
                </li>
                :
                <li className="nav-item p-4 pe-5">
                    <a className="nav-link wd-button" onClick={logOut}><FaUser style={{fontSize: "1.2em", marginBottom: "6px"}} />
                        Logout
                    </a>
                </li>
            }
        </ul>
    );
}

export default Navbar;