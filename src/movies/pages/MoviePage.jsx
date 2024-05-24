import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../helpers/getMovieById";

export const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  const vote_average = movie?.vote_average || 0;  // Asegúrate de que vote_average tenga un valor por defecto si es undefined


  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const movie = await getMovieById(id);
    setMovie(movie);
  };

  const getBack = () => {
    navigate(-1);
  }

  const getColor = (vote) => {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  return (
    <>
      <button className="btn" onClick={getBack}>Go Back</button>
      <section className="card-page">
        <MovieCard {...movie} />
        <div className="overview-section">
          <h2>Release Date:</h2>
          <p className="overview">{movie.release_date}</p>
          <h2>Synopsis:</h2>
          <p className="overview">{movie.overview}</p>
          <h2>Rating: </h2>
          <p className={getColor(vote_average)}>{movie.vote_average?.toFixed(1)}</p>
        </div>
      </section>

    </>
  );
};
