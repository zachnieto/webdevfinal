import React, {useState} from "react";

const Login = () => {

    const [hasAccount, setHasAccount] = useState(true)
    const [loggedInMsg, setLoggedInMsg] = useState("Need to create an account?")

    const toggleLogin = () => {
        setHasAccount(!hasAccount)
        if (hasAccount) {
            setLoggedInMsg("Already have an account?")
        }
        else {
            setLoggedInMsg("Need to create an account?")
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-3 text-center align-items-center">
                <h1>Login</h1>
                <input className="form-control m-3" placeholder="Username"/>
                <input className="form-control m-3" placeholder="Password" type="password"/>

                {hasAccount ?
                    <button className="btn btn-primary m-3">Login</button>

                    :
                    <button className="btn btn-primary m-3">Signup</button>

                }
                <h4 className="hover-hand" onClick={toggleLogin}>{loggedInMsg}</h4>


            </div>
        </div>
    );
}

export default Login;