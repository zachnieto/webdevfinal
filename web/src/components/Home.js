import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {deleteAccount, getNewestUser, getUsers, getVisitedLinks, logout} from "../actions/server-actions";

const Home = () => {

    const session = useSelector(state => state.sessionReducer);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const [visitedLinks, setVisitedLinks] = useState([])
    const [newestUser, setNewestUser] = useState("")

    useEffect(() => {
        if (session.user) {
            if (session.user.role === "Admin" ) {
                const fetchUsers = async () => {
                    const retrievedUsers = await getUsers()
                    setUsers(retrievedUsers)
                }
                fetchUsers()
            }

            const fetchLinks = async () => {
                const retrievedLinks = await getVisitedLinks()
                setVisitedLinks(retrievedLinks.reverse())
            }
            fetchLinks()
        }

        const fetchNewestUser = async () => {
            const retrievedUser = await getNewestUser()
            setNewestUser(retrievedUser)
        }
        fetchNewestUser()

    }, [session.user]);

    const deleteUser = async (user) => {
        console.log(user)
        await deleteAccount(user._id)
        setUsers(users.filter(u => u !== user))

        if (user._id === session.user._id) {
            await logout(dispatch)
        }
    }

    return (
        <div>
            <div className="row align-items-center justify-content-center ">
                <div className="col-3 text-center">
                    <h2>Newest User</h2>
                    <h3 className="pb-5">{newestUser}</h3>

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
                    {session.user &&
                    <>
                        <h2>Recently Viewed</h2>
                        {visitedLinks.map((link, i) => <Link key={i} className="d-block" to={`/search/details/${link.id}`}>{link.name}</Link>)}
                    </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;