import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {deleteUser, updateUser} from "../actions/server-actions";

const Profile = () => {

    const session = useSelector(state => state.sessionReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const editProfile = async () => {
        const user = session.user
        if (username !== "")
            user.username = username
        if (password !== "")
            user.password = password

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
                        <input className="form-control mt-3 mb-3" placeholder={session.user.username} type="text"
                               onChange={e => setUsername(e.target.value)}/>
                        <input className="form-control mt-3 mb-3" placeholder="Password" type="password"
                               onChange={e => setPassword(e.target.value)}/>
                        <button className="btn btn-primary mt-5" onClick={editProfile}>Apply Changes</button>
                        <button className="btn btn-danger mt-5 ms-5" onClick={deleteAccount}>Delete Account</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;