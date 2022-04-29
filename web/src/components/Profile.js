import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteAccount, deleteAccountAndLogout, deleteUser, updateUser } from "../actions/server-actions";
import PrivateProfileInfo from './PrivateProfileInfo';

const Profile = () => {

    const session = useSelector(state => state.sessionReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("***");
    const [role, setRole] = useState("");
    

    useEffect(() => {
        if (session.user) {
            setRole(session.user.role);
            setUsername(session.user.username);
            setPassword(session.user.password);
        }

    }, [session.user]);

    const editProfile = async () => {
        const user = session.user;
        user.password = password;
        user.username = username;
        user.role = role;

        await updateUser(dispatch, user._id, user)
            .catch(e => console.log(e));
    };

    const deleteProfile = async () => {
        navigate("/");
        await deleteAccountAndLogout(dispatch, session.user._id)
            .catch(e => console.log(e));
    };

    return (
        <div className="h-100 justify-content-center align-items-center">
            {session.user &&
                <div className="row justify-content-center text-center">
                    <h1>Profile</h1>
                    <div className="col-xl-4 col-lg-5 col-md-6 col-9">
                        <PrivateProfileInfo username={username}/>
                    </div>
                    <div className="col-xl-2 col-lg-1 d-lg-flex d-md-none"></div>
                    <div className="col-md-6 col-9 p-4">
                        <h2>Edit</h2>
                        <input className="form-control mt-3 mb-3" placeholder={username} type="text"
                            onChange={e => setUsername(e.target.value)} />
                        <input className="form-control mt-3 mb-3" placeholder="Password" type="password"
                            onChange={e => setPassword(e.target.value)} />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="memberButton"
                                checked={role === "Member"} onChange={() => setRole("Member")} />
                            <label className="form-check-label" htmlFor="memberButton"> Member </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="adminButton"
                                checked={role === "Admin"} onChange={() => setRole("Admin")} />
                            <label className="form-check-label" htmlFor="adminButton"> Admin </label>
                        </div>
                        <br/>
                        <button className="btn btn-primary mt-5" onClick={editProfile}>Apply Changes</button>
                        <button className="btn btn-danger mt-5 ms-5" onClick={deleteProfile}>Delete Account</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;