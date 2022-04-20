import React, { useState } from "react";
import { login, signup } from "../actions/server-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {

    const [hasAccount, setHasAccount] = useState(true);
    const [loggedInMsg, setLoggedInMsg] = useState("Need to create an account?");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
            'password': password
        };

        if (hasAccount) {
            await login(dispatch, user)
                .then(() => {
                    navigate("/profile");
                })
                .catch(e => console.log(e));
        } else {
            await signup(dispatch, user)
                .then(() => {
                    navigate("/profile");
                })
                .catch(e => console.log(e));
        }
    };

    const onKeyDownInput = (event) => {
        if (event.key === 'Enter') {
            loginSignup();
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-3 text-center align-items-center">
                <h1>Login</h1>
                <input
                    className="form-control m-3"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={onKeyDownInput} />
                <input
                    className="form-control m-3"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={onKeyDownInput} />
                <button className="btn btn-primary m-3" onClick={loginSignup}>{hasAccount ? "Login" : "Signup"}</button>
                <h5>{error}</h5>
                <h4 className="hover-hand" onClick={toggleLogin}>{loggedInMsg}</h4>


            </div>
        </div>
    );
};

export default Login;