import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BOOKMARKED = 'BOOKMARKED';
const LIKED = 'LIKED';
const DISLIKED = 'DISLIKED';

const PrivateProfileInfo = ({ liked, disliked, bookmarked }) => {
  const [content, setContent] = useState([]);
  const [pillName, setPillName] = useState(BOOKMARKED);

  useEffect(() => {
    switch (pillName) {
      case LIKED:
        setContent(liked);
        break;
      case DISLIKED:
        setContent(disliked);
        break;
      case BOOKMARKED:
        setContent(bookmarked);
        break;
      default:
        setContent([]);
    }
  }, [pillName, liked, disliked, bookmarked]);

  return (
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <span
            className={`hover-hand nav-link${pillName === BOOKMARKED ? ' active' : ''}`}
            onClick={() => setPillName(BOOKMARKED)}
          >
            Bookmarked
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`hover-hand nav-link${pillName === LIKED ? ' active' : ''}`}
            onClick={() => setPillName(LIKED)}
          >
            Liked
          </span>
        </li>
        <li className="nav-item">
          <span
            className={`hover-hand nav-link${pillName === DISLIKED ? ' active' : ''}`}
            onClick={() => setPillName(DISLIKED)}
          >
            Disliked
          </span>
        </li>
      </ul>

      <ul className="list-group">
        {content && content.map(game => (
          <li className="list-group-item" key={game.igdbId}>
            <Link to={`/search/details/${game.igdbId}`}>{game.gameName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PrivateProfileInfo;