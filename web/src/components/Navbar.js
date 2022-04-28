import React from "react";
import {FaUser, FaList} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/server-actions";

import './index.css'

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
            <li className="nav-item ms-auto p-4">
                <a className="nav-link" href="/"> <AiOutlineHome className="wd-react-icon-size"/>Home</a>
            </li>
            <li className="nav-item p-4">
                <Link className="nav-link" to="/search"><FaList className="wd-react-icon-size"/>Search</Link>
            </li>
            {!("user" in session) ?
                <li className="nav-item p-4 pe-5">
                    <a className="nav-link wd-button" onClick={logIn}><FaUser className="wd-react-icon-size" /> Login</a>
                </li>
                :
                <>
                <li className="nav-item p-4">
                    <Link className="nav-link" to="/profile"><FaUser className="wd-react-icon-size"/>Profile</Link>
                </li>
                <li className="nav-item p-4 pe-5">
                    <a className="nav-link wd-button" onClick={logOut}><FaUser className="wd-react-icon-size" />
                        ({session.user.username})
                        Logout
                    </a>
                </li>
                </>
            }
        </ul>
    );
}

export default Navbar;