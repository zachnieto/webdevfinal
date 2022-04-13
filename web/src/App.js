
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getSession} from "./actions/server-actions";
import Login from "./components/Login";


function App() {

    const dispatch = useDispatch()
    const session = useSelector(state => state.sessionReducer)

    useEffect(() => {
        const updateSession = async () => {
            await getSession(dispatch)
        }
        updateSession()
    }, [])

    return (
    <div className="container-fluid">

        <Particles/>
        <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>

    </div>
    );
}

export default App;
