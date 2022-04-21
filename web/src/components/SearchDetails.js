import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGameDetails } from '../services/game-service';
import SecureContent from './SecureContent';

const SearchDetails = () => {

  const [gameDetails, setGameDetails] = useState({});
  const [coverImg, setCoverImg] = useState();
  // TODO: Add this with likes and comments and stuff
  // const [ourMovieDetails, setOurMovieDetails] = useState({})
  const { gameId } = useParams();
  const fetchGameDetails = async () => {
    const resp = await getGameDetails(gameId);
    setGameDetails(resp);
  };
  useEffect(() => {
    fetchGameDetails();
  }, [gameId]);

  useEffect(() => {
    setCoverImg(`http://images.igdb.com/igdb/image/upload/t_cover_big/${gameDetails.cover}.jpg`);
  }, [gameDetails]);

  // const handleLikes = () => {
  //   console.log(movieDetails);
  //   const movie = {
  //     title: movieDetails.Title,
  //     poster: movieDetails.Poster,
  //     imdbID: movieDetails.imdbID
  //   };
  //   // axios.post("http://localhost:4000/api/likes", movie);
  // };

  return (
    <div class="container">
      <h1>{gameDetails.name}</h1>
      <div class="row">
        <img src={coverImg} className="col-4 col-md-3" alt={`${gameDetails.name} cover`} />
        <div className="col-12 col-md-9">
          <div>
            Released {new Date(gameDetails.first_release_date * 1000).toLocaleDateString('en-US')}
          </div>
          <h2>Summary</h2>
          {gameDetails.summary}
          <div>
            Rating: {gameDetails.total_rating ? gameDetails.total_rating.toFixed(2) : 0} / 100 ({gameDetails.total_rating_count} ratings)
          </div>
        </div>
      </div>
      <div>
        Similar Games:
        {gameDetails.similar_games && gameDetails.similar_games.length >= 0 ? (
          <ul>
            {gameDetails.similar_games.map(game => (
              <li><Link to={`/search/details/${game.id}`}>{game.name}</Link></li>
            ))}
          </ul>
        )
          : (<>No similar games available.</>)
        }
      </div>
      <div>
        Read more:
        {gameDetails.websites && gameDetails.websites.length >= 0 ? (
          <ul>
            {gameDetails.websites.map(website => (<li><a href={website}>{website}</a></li>))}
          </ul>
        )
          : (<>No external websites available.</>)
        }
      </div>

      {/* <button onClick={handleLikes}>
        Like ({ourMovieDetails.likes})
      </button>
      <button>Dislike</button>
      <h2>Leave a comment</h2>
      <textarea></textarea>
      <button>Post</button> */}

      {/* <ul>
        <li>Alice liked this movie</li>
        <li>Bob hated this movie</li>
      </ul> */}
    </div>
  );

};

export default SearchDetails;