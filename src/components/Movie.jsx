import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie, viewTrailer }) => {
    const { starred, watchLater } = useSelector(state => state)
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()

    const closeCard = (e) => {
        e.stopPropagation()
        e.currentTarget.closest('.card').classList.remove('opened')
    }

    const isStarred = starred.starredMovies.some(m => m.id === movie.id)
    const isWatchLater = watchLater.watchLaterMovies.some(m => m.id === movie.id)

    const handleStar = () => {
        const action = isStarred ? unstarMovie : starMovie
        dispatch(action(movie))
    }

    const handleWatchLater = () => {
        const action = isWatchLater ? removeFromWatchLater : addToWatchLater
        dispatch(action(movie))
    }

    return (
        <div className="wrapper">
            <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')}>
                <div className="card-body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">{movie.overview}</div>
                        <div className="year">{movie.release_date?.substring(0, 4)}</div>
                        <span className="btn-star" data-testid={isStarred ? "unstar-link" : "starred-link"} onClick={handleStar}>
                            <i className={`bi bi-star${isStarred ? '-fill' : ''}`} data-testid={isStarred ? "star-fill" : ""} />
                        </span>
                        <button type="button" 
                            data-testid={isWatchLater ? "remove-watch-later" : "watch-later"} 
                            className={`btn btn-light btn-watch-later ${isWatchLater ? 'blue' : ''}`} 
                            onClick={handleWatchLater}>
                            {isWatchLater ? <i className="bi bi-check"></i> : 'Watch Later'}
                        </button>
                        <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>
                    </div>
                    <img className="center-block" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
                </div>
                <h6 className="title mobile-card">{movie.title}</h6>
                <h6 className="title">{movie.title}</h6>
                <button type="button" className="close" onClick={closeCard} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default Movie
