import { useEffect, useState, useCallback, useRef } from 'react';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies, resetMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import Modal from './components/Modal'
import useInfiniteScroll from './hooks/useInfiniteScroll';
import './app.scss'

const App = () => {

  const state = useSelector((state) => state)
  const { movies } = state  
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()
  const keepLoadingRef = useRef();

  const closeModal = () => setOpen(false)

  const getSearchResults = (query) => {
    dispatch(resetMovies());
    if (query !== '') {
      dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=${query}`, page: 1 }));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: 1 }));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = useCallback(() => {
    if (movies.fetchStatus !== 'loading') {
      const nextPage = movies.page + 1;
      if (searchQuery) {
        dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=${searchQuery}`, page: nextPage }));
      } else {
        dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, page: nextPage }));
      }
    }
  }, [dispatch, searchQuery, movies.page, movies.fetchStatus]);

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  useInfiniteScroll({ ref: keepLoadingRef, keepLoading: getMovies });

  useEffect(() => {
    if (movies.movies.length === 0) {
      getMovies();
    }
  }, [getMovies, movies.movies.length]);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
      <Modal isOpen={isOpen} onClose={closeModal}>
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div>
            <h6>No trailer available. Try another movie</h6>
          </div>
        )}
      </Modal>


        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>

        <div ref={keepLoadingRef} style={{ height: '1px' }}></div>

      </div>
    </div>
  )
}

export default App
