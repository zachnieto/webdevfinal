import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { searchGames } from '../actions/game-actions';
import { getUsers } from '../actions/server-actions';

const GAMES = 'GAMES';
const USERS = 'USERS';

const Search = () => {
  const [searchResults, setSearchResults] = useState(undefined);
  const { searchString } = useParams();
  const [searchType, setSearchType] = useState(GAMES);
  const searchQueryRef = useRef();
  const navigate = useNavigate();

  const search = useCallback(async () => {
    const searchQuery = searchQueryRef.current.value;
    let results;

    if (searchType === GAMES) {
      results = await searchGames(searchQuery);
      navigate(`/search/games/${searchQuery}`);
    } else { // searchType === USERS
      results = await getUsers(searchQuery);
      navigate(`/search/users/${searchQuery}`);
    }

    setSearchResults(results);
  }, [searchType, navigate]);

  const onKeyDownInput = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    if (searchString) {
      searchQueryRef.current.value = searchString;
      search();
    }
  }, [searchString, search]);

  return (
    <div>
      <h1>Search</h1>
      <ul className="list-group">
        <li className="list-group-item row d-flex">
          <div className="col-xl-9 col-lg-8 col-md-7 col-12">
            <input ref={searchQueryRef}
              placeholder="Search games"
              className="form-control"
              onKeyDown={onKeyDownInput} />
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 col-12 my-md-0 my-3 d-flex align-items-center justify-content-end">
            <label className="mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                defaultChecked
                onClick={() => setSearchType(GAMES)}
              />
              &nbsp;Games
            </label>
            <label className="mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                onClick={() => setSearchType(USERS)}
              />
              &nbsp;Users
            </label>
            <button
              onClick={search}
              className="btn btn-primary mx-2">
              Search
            </button>
          </div>
        </li>
        {
          searchResults === undefined ?
            ''
            : searchResults.length === 0
              ? <span className="list-group-item row">No results found.</span>
              : searchResults.map(result =>
                <li className="list-group-item row d-flex" key={result._id}>
                  <Link to={searchType === GAMES
                    ? `/search/details/${result._id}`
                    : `/profile/${result.username}`}>
                    {result.name || result.username}
                  </Link>
                </li>
              )

        }
      </ul>
    </div >
  );
};

export default Search;