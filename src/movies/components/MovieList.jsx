import { MovieCard } from "./MovieCard"

export const MovieList = ({ movies }) => {
    return (
        <>
            <section className="movies">
                {movies.map(movie => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </section>

        </>
    )
}