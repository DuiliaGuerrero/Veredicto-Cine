import { useEffect, useState } from "react";
import { MovieList } from "../components/MovieList";
import { useForm } from "../../hooks/useForm";
import { getMovies } from "../helpers/getMovies";
import { searchMovie } from "../helpers/searchMovie";

export const HomePage = () => {
  const { searchText, onInputChange, formState: { errors } } = useForm({
    searchText: ''
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getLastMovies();
  }, []);

  const getLastMovies = async () => {
    setLoading(true);
    try {
      const { results } = await getMovies();
      setMovies([...results]);
      setError('');
    } catch (err) {
      setError('Hubo un problema al obtener las películas.');
    } finally {
      setLoading(false);
    }
  };

  const onSearchMovie = async (event) => {
    event.preventDefault();

    if (!searchText.trim()) {
      setError('Por favor digite el nombre de alguna película');
      return;
    }

    setLoading(true);
    try {
      const { results } = await searchMovie(searchText);
      if (results.length === 0) {
        setError('No se encontraron resultados.');
      } else {
        setMovies([...results]);
        setError('');
      }
    } catch (err) {
      setError('Hubo un problema con la búsqueda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="navbar">
        <h1 className="logo"> Veredicto Cine </h1>
        <form className="search" onSubmit={onSearchMovie}>
          <input
            type="text"
            name="searchText"
            value={searchText}
            onChange={onInputChange}
            placeholder="Movie search..."
          />
          <button className="btn">
            <svg fill="#fff" width="15px" height="15px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fill-rule="evenodd"></path>
            </svg>
          </button>
        </form>
      </section>
      {
        loading &&
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      }
      {error && <p className="error">{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </>
  );
};
