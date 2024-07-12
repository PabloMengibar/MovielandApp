import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer }) => {

    return (
        <div className='movies-container' data-testid="movies">
            {movies.movies?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    )
}

export default Movies
