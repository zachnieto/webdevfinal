import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SecureContent from './SecureContent';
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import './index.css';
import { toggleBookmark } from '../services/server-service';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails, updateGameLikeDislike } from '../actions/game-actions';

const SearchDetails = () => {

  const { user } = useSelector(state => state.sessionReducer);
  const gameDetails = useSelector(state => state.gameReducer);

  const dispatch = useDispatch();

  const [coverImg, setCoverImg] = useState();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const { gameId: gameParamId } = useParams();

  const {
    id: gameId,
    name,
    first_release_date: firstReleaseDate,
    companies,
    platforms,
    total_rating: totalRating,
    total_rating_count: totalRatingCount,
    similar_games: similarGames,
    websites,
    likes,
    dislikes,
    isLiked: gameIsLiked,
    isDisliked: gameIsDisliked,
    isBookmarked: gameIsBookmarked,
  } = gameDetails;

  useEffect(() => {
    const fetchGameDetails = async () => {
      await getGameDetails(dispatch, gameParamId, user?._id);
    };
    fetchGameDetails();
  }, [dispatch, gameParamId, user?._id]);

  useEffect(() => {
    setCoverImg(`http://images.igdb.com/igdb/image/upload/t_cover_big/${gameDetails.cover?.image_id}.jpg`);
  }, [gameDetails.cover]);

  useEffect(() => {
    setIsBookmarked(gameIsBookmarked);
  }, [gameIsBookmarked]);

  useEffect(() => {
    setIsLiked(gameIsLiked);
  }, [gameIsLiked]);

  useEffect(() => {
    setIsDisliked(gameIsDisliked);
  }, [gameIsDisliked]);

  useEffect(() => {
    setLikesCount(likes);
  }, [likes]);

  useEffect(() => {
    setDislikesCount(dislikes);
  }, [dislikes]);

  const handleBookmark = () => {
    toggleBookmark(user._id, gameId);
    setIsBookmarked(!isBookmarked);
  };

  const handleLikes = async () => {
    // You cannot like and dislike something at the same time
    if (isDisliked) {
      setIsDisliked(false);
      setDislikesCount(dislikesCount - 1);
    }
    // If a game is disliked, then the newDislike should be true (since true indicates a dislike)
    // Else it should be undefined (neither liked nor disliked)
    const newLike = !isLiked || undefined;
    const newIsLiked = !!newLike;
    updateGameLikeDislike(dispatch, gameId, user._id, newLike);
    setIsLiked(newIsLiked);
    setLikesCount(newIsLiked ? likesCount + 1 : likesCount - 1);
  };

  const handleDislikes = async () => {
    // You cannot like and dislike something at the same time
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    }
    // If a game is disliked, then the newDislike should be false (since false indicates a dislike)
    // Else it should be undefined (neither liked nor disliked).
    const newDislike = isDisliked && undefined;
    const newIsDisliked = newDislike !== undefined;
    updateGameLikeDislike(dispatch, gameId, user._id, newDislike);
    setIsDisliked(newIsDisliked);
    setDislikesCount(newIsDisliked ? dislikesCount + 1 : dislikesCount - 1);
  };
  
  return (
    <div className="container">
      <div className="row">
        <h1 className="col-10">{name}</h1>
        <SecureContent>
          <button className="col-2 btn btn-primary" onClick={handleBookmark}>
            {
              isBookmarked
                ? <BsBookmarkFill className="wd-react-icon-size align-middle mx-1 mb-0" />
                : <BsBookmark className="wd-react-icon-size align-middle mx-1 mb-0" />
            }
            <span className="align-middle mx-1">Bookmark</span>
          </button>
        </SecureContent>
      </div>
      <div className="row">
        <div className="col-5 col-md-5 col-lg-4">
          <img src={coverImg} alt={`${name} cover`} />
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          <div>
            Released {new Date(firstReleaseDate * 1000).toLocaleDateString('en-US')}
          </div>
          <div>
            Companies: {companies?.map(company => company.name).join(', ') ?? 'No platforms available'}
          </div>
          <div>
            Platforms: {platforms?.map(platform => platform.name).join(', ') ?? 'No platforms available'}
          </div>
          <h2>Summary</h2>
          {gameDetails.summary}
          <div>
            Rating: {totalRating?.toFixed(2) ?? 0} / 100 ({totalRatingCount ?? 0} ratings)
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-5 col-md-5 col-lg-4 my-3">
          <div className="d-inline-block me-2">
            <SecureContent>
              <button className="btn btn-primary me-3" onClick={handleLikes}>
                {
                  isLiked
                    ? <AiFillLike className="wd-react-icon-size" />
                    : <AiOutlineLike className="wd-react-icon-size" />
                }
              </button>
            </SecureContent>
            Likes: {likesCount}
          </div>
          <div className="d-inline-block mx-2">
            <SecureContent>
              <button className="btn btn-primary me-3" onClick={handleDislikes}>
                {
                  isDisliked
                    ? <AiFillDislike className="wd-react-icon-size" />
                    : <AiOutlineDislike className="wd-react-icon-size" />
                }
              </button>
            </SecureContent>
            Dislikes: {dislikesCount}
          </div>

          {/* <div>
            Comments
            <br />
            <SecureContent>
              <textarea className="form-control w-75 align-middle d-inline" placeholder="Leave a comment!" />
              <button className="btn btn-primary align-bottom d-inline ms-3">Post</button>
            </SecureContent>
          </div> */}
        </div>
        <div className="col-12 col-md-7 col-lg-8">
          <div>
            Similar Games:
            {similarGames && similarGames.length >= 0 ? (
              <ul>
                {similarGames.map(game => (
                  <li key={game.id}>
                    <Link to={`/search/details/${game.id}`}>{game.name}</Link>
                  </li>
                ))}
              </ul>
            )
              : (<>No similar games available.</>)
            }
          </div>
          <div>
            Read more:
            {websites && websites.length >= 0 ? (
              <ul>
                {websites.map(website => (
                  <li key={website.id}><a href={website.url}>{website.url}</a></li>
                ))}
              </ul>
            )
              : (<>No external websites available.</>)
            }
          </div>
        </div>
      </div >

      {/* <button onClick={handleLikes}>
        Like ({ourMovieDetails.likes})
      </button>
      <button>Dislike</button>
      <h2>Leave a comment</h2>
      <textarea></textarea>
      <button>Post</button> */};

      {/* <ul>
        <li>Alice liked this movie</li>
        <li>Bob hated this movie</li>
      </ul> */}
    </div >
  );

};

export default SearchDetails;