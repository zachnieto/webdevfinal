
import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Particles from "./components/Particles";
import Navbar from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getSession} from "./actions/server-actions";
import Login from "./components/Login";
import Profile from "./components/Profile";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSession = async () => {
            await getSession(dispatch)
        }
        fetchSession()
            .catch(console.error)
    }, [])


    return (
    <div className="container-fluid min-vh-100">

        <Particles/>
        <Router>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Router>

    </div>
    );
}

export default App;
