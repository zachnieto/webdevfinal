import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {deleteUser, updateUser} from "../actions/server-actions";

const Profile = () => {

    const session = useSelector(state => state.sessionReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("***")
    const [role, setRole] = useState("")

    useEffect(() => {
        if (session.user) {
            setRole(session.user.role)
            setUsername(session.user.username)
            setPassword(session.user.password)
        }

    }, [session.user])

    const editProfile = async () => {
        const user = session.user
        user.password = password
        user.username = username
        user.role = role

        await updateUser(dispatch, user._id, user)
            .catch(e => console.log(e))
    }

    const deleteAccount = async () => {
        navigate("/")
        await deleteUser(dispatch, session.user._id)
            .catch(e => console.log(e))
    }

    return (
        <div className="row h-100 justify-content-center align-items-center">
            {session.user &&
                <div className="col-6 text-center">
                    <h1>Profile</h1>
                    <div className="profile-details p-5">
                        <input className="form-control mt-3 mb-3" placeholder={username} type="text"
                               onChange={e => setUsername(e.target.value)}/>
                        <input className="form-control mt-3 mb-3" placeholder="Password" type="password"
                               onChange={e => setPassword(e.target.value)}/>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="memberButton"
                                   checked={role==="Member"} onChange={() => setRole("Member")}/>
                            <label className="form-check-label" htmlFor="memberButton"> Member </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="adminButton"
                                   checked={role==="Admin"} onChange={() => setRole("Admin")}/>
                            <label className="form-check-label" htmlFor="adminButton"> Admin </label>
                        </div>
                        <button className="btn btn-primary mt-5" onClick={editProfile}>Apply Changes</button>
                        <button className="btn btn-danger mt-5 ms-5" onClick={deleteAccount}>Delete Account</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;