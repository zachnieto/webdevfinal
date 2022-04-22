import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import {deleteComment, getProfile, submitComment} from "../actions/server-actions";
import {useSelector} from "react-redux";

const PublicProfile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState({})
    const commentMsg = useRef()
    const session = useSelector(state => state.sessionReducer);
    const [comments, setComments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await getProfile(username)
                .catch(e => navigate("/"))
            setComments(profileData.comments.reverse())
            setProfile(profileData)
        }
        fetchProfile()
    }, [username])

    const handleDelete = async (comment) => {
        console.log(comment)

        await deleteComment(profile._id, comment)
        setComments(comments.filter(c => c !== comment))
    }

    const handleComment = async () => {
        const comment = {
            "postedBy": {
                "username": session.user.username,
                "id": session.user._id
            },
            "msg": commentMsg.current.value,
            "timestamp": Date.now()
        }
        await submitComment(profile._id, comment)
        setComments([comment, ...comments])
    }

    return (
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-6 text-center">
                <h1>{profile.username}</h1>
                {/*<div className="profile-details p-5">*/}
                {/*    Details*/}
                {/*</div>*/}
                {session.user &&
                    <div className="form-group m-5">
                        <label className="">Leave a comment</label>
                        <textarea ref={commentMsg} className="form-control"></textarea>
                        <button className="btn btn-primary float-end" onClick={handleComment}>Comment</button>
                    </div>
                }
                {comments.length !== 0 &&
                    <div className="comments">
                        {comments && comments.map(comment =>
                            <div key={comment.timestamp} className="text-start ps-4 comment">
                                <a className="d-inline"
                                   href={`/profile/${comment.postedBy.username}`}>{comment.postedBy.username}:</a>
                                <h5 className="d-inline comment-date ps-3">{new Date(comment.timestamp)
                                    .toLocaleDateString("en-US", {hour: "2-digit", minute: "2-digit"})}</h5>
                                {session.user && session.user.role === "Admin" && <button className="btn btn-danger float-end"
                                                                                          onClick={() => handleDelete(comment)}>Delete</button>}
                                <p>{comment.msg}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );

}

export default PublicProfile;