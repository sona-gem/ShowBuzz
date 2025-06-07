import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import "./../css/MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  if (!movie)
    return (
      <p style={{ color: "white", textAlign: "center" }}>Movie not found</p>
    );

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ")}
      </p>
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
    </div>
  );
}

export default MovieDetail;
