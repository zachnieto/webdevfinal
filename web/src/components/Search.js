import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { searchGames } from '../services/game-service';

const Search = () => {
  const [games, setGames] = useState([]);
  const { searchString } = useParams();
  const titleRef = useRef();
  const navigate = useNavigate();
  // const location = useLocation();
  const searchGamesByTitle = async () => {
    const gamesList = await searchGames(titleRef.current.value);
    setGames(gamesList);
    navigate(`/search/${titleRef.current.value}`);
  };

  const onKeyDownInput = (event) => {
    if (event.key === 'Enter') {
      searchGamesByTitle();
    }
  }

  useEffect(() => {
    if (searchString) {
      titleRef.current.value = searchString;
      searchGamesByTitle();
    }
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <button
            onClick={searchGamesByTitle}
            className="btn btn-primary float-end">
          Search
        </button>
        <input ref={titleRef}
          placeholder="Search games"
          className="form-control w-75"
          onKeyDown={onKeyDownInput}/>
      </li>
      {
        games.map(game =>
          <li className="list-group-item">
            <Link to={`/search/details/${game.id}`}>
              {game.name}
            </Link>
          </li>
        )
      }
    </ul>
    </div >
  );
};

export default Search;