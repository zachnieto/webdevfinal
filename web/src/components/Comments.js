import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteComment, submitComment } from '../actions/server-actions';

const Comments = ({ userId, comments }) => {
  const [commentList, setCommentList] = useState();
  const commentMsg = useRef();
  const session = useSelector(state => state.sessionReducer);

  useEffect(() => setCommentList(comments), [comments]);

  const handleComment = async () => {
    const comment = {
      "postedBy": {
        "username": session.user.username,
        "id": session.user._id
      },
      "msg": commentMsg.current.value,
      "timestamp": Date.now()
    };
    await submitComment(userId, comment);
    setCommentList([comment, ...comments]);
  };


  const handleDelete = async (comment) => {
    await deleteComment(userId, comment);
    setCommentList(comments.filter(c => c !== comment));
  };

  return (
    <>
      {session.user &&
        <div className="form-group mx-5">
          <label className="">Leave a comment</label>
          <textarea ref={commentMsg} className="form-control" placeholder="Enter comment here..."></textarea>
          <div className="d-flex justify-content-end">
          <button className="btn btn-primary my-2" onClick={handleComment}>Comment</button>
          </div>
        </div>
      }
      {comments && comments.length !== 0
        ? <div className="comments">
          {
            commentList && commentList.map(comment =>
              <div key={comment.timestamp} className="text-start ps-4 comment">
                <Link
                  className="d-inline"
                  to={`/profile/${comment.postedBy.username}`}
                >
                  {comment.postedBy.username}
                </Link>:
                <br />
                <h6 className="d-inline comment-date">
                  {new Date(comment.timestamp).toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </h6>
                {
                  session.user && session.user.role === "Admin" && <button className="btn btn-danger float-end"
                    onClick={() => handleDelete(comment)}>Delete</button>
                }
                <p>{comment.msg}</p>
              </div>
            )}
        </div>
        : 'No comments yet.'
      }
    </>);
};

export default Comments;