import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../services/server-service';

const SecureContent = ({ children }) => {
  const sessionReducer = useSelector(state => state.sessionReducer);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const check = async () => {
      await getSession(dispatch);
      // If there is a user in the session, then they're logged in
      setLoggedIn(!!sessionReducer.user);
    };
    check();
  }, [dispatch, sessionReducer]);

  if (loggedIn) {
    return children;
  }
  return null;
};

export default SecureContent;