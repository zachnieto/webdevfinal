import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteAccount, getUsers, logout} from "../actions/server-actions";

const Home = () => {

    const session = useSelector(state => state.sessionReducer);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (session.user && session.user.role === "Admin" ) {
            const fetchUsers = async () => {
                const retrievedUsers = await getUsers()
                setUsers(retrievedUsers)
            }
            fetchUsers()
        }
    }, [session.user]);

    const deleteUser = async (user) => {
        console.log(user)
        await deleteAccount(user._id)
        setUsers(users.filter(user => user !== user))

        if (user._id === session.user._id) {
            await logout(dispatch)
        }
    }

    return (
        <div>
            <div className="row align-items-center justify-content-center ">
                <div className="col-3">
                    {session.user && session.user.role === "Admin" &&
                        <>
                            <h2 className="text-center">Users</h2>
                            {users.map((user, i) =>
                                <div key={i} className="home-user">
                                    <h3 className="d-inline">{user.username}</h3>
                                    <button className="btn btn-danger float-end" onClick={() => deleteUser(user)}>Delete</button>
                                </div>
                            )}
                        </>
                    }
                </div>
                <div className="col-6 ">
                    <h1 className="text-center home-header main"><strong>WebDev</strong></h1>
                </div>
                <div className="col-3">
                </div>
            </div>
        </div>
    );
};

export default Home;