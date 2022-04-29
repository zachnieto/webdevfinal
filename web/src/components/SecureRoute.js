import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { getSession } from '../services/server-service';

const SecureRoute = ({ children }) => {
  const sessionReducer = useSelector(state => state.sessionReducer);
  const [loggedIn, setLoggedIn] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const check = async () => {
      const session = await getSession(dispatch);
      console.log(session)
      // If there is a user in the session, then they're logged in
      setLoggedIn(!!session.user);
      setWaiting(false);
    };
    check();
  }, [dispatch, sessionReducer]);


  console.log(loggedIn)
  if (loggedIn) {
    return children;
  } else if (waiting) {
    return null;
  } else {
    return <Navigate to="/login" />;
  }
};

export default SecureRoute;