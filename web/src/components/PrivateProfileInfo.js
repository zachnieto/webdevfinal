import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrivateProfile } from '../actions/server-actions';

const BOOKMARKED = 'BOOKMARKED';
const LIKED = 'LIKED';
const DISLIKED = 'DISLIKED';

const PrivateProfileInfo = ({ username }) => {
  const [privateProfile, setPrivateProfile] = useState({});
  const [content, setContent] = useState([]);
  const [pillName, setPillName] = useState(BOOKMARKED);

  useEffect(() => {
    const fetchPrivateProfile = async () => {
      const privateProfileData = await getPrivateProfile(username);
      setPrivateProfile(prevPrivateProfile => ({...prevPrivateProfile, ...privateProfileData}));
    };
    fetchPrivateProfile();
  }, [username]);

  useEffect(() => {
    switch (pillName) {
      case LIKED:
        setContent(privateProfile.liked);
        break;
      case DISLIKED:
        setContent(privateProfile.disliked);
        break;
      case BOOKMARKED:
        setContent(privateProfile.bookmarked);
        break;
      default:
        setContent([]);
    }
  }, [pillName, privateProfile]);

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