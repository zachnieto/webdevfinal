import React, { useState } from "react";
import { login, signup } from "../actions/server-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {

    const [hasAccount, setHasAccount] = useState(true);
    const [loggedInMsg, setLoggedInMsg] = useState("Need to create an account?");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Member");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleLogin = () => {
        setHasAccount(!hasAccount);
        if (hasAccount) {
            setLoggedInMsg("Already have an account?");
        }
        else {
            setLoggedInMsg("Need to create an account?");
        }
    };

    const loginSignup = async () => {
        const user = {
            'username': username,
            'password': password,
            'role': role
        };

        if (hasAccount) {
            await login(dispatch, user)
                .then(() => {
                    navigate("/profile");
                })
                .catch(e => setError(e.response.data));
        } else {
            await signup(dispatch, user)
                .then(() => {
                    navigate("/profile");
                })
                .catch(e => setError(e.response.data));
        }
    };

    const onKeyDownInput = (event) => {
        if (event.key === 'Enter') {
            loginSignup();
        }
    };

    return (
        <div className="row justify-content-center ">
            <div className="col-3 text-center login-details">
                <h1>Login</h1>
                <input
                    className="form-control mt-3"
                    placeholder="Username" onChange={e => setUsername(e.target.value)}
                    onKeyDown={onKeyDownInput}
                />
                <input
                    className="form-control mt-3 mb-3"
                    placeholder="Password" type="password"
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={onKeyDownInput}
                />

                {!hasAccount &&
                    <>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="memberButton"
                                checked onClick={() => setRole("Member")} />
                            <label className="form-check-label" htmlFor="memberButton"> Member </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="adminButton"
                                onClick={() => setRole("Admin")} />
                            <label className="form-check-label" htmlFor="adminButton"> Admin </label>
                        </div>
                    </>
                }
                <br />
                <button className="btn btn-primary m-3" onClick={loginSignup}>{hasAccount ? "Login" : "Signup"}</button>
                <h5 className="text-danger">{error}</h5>
                <h4 className="hover-hand" onClick={toggleLogin}>{loggedInMsg}</h4>


            </div>
        </div>
    );
};

export default Login;