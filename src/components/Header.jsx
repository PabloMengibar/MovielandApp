import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

import '../styles/header.scss'

const Header = ({ searchMovies }) => {

  const { starredMovies } = useSelector((state) => state.starred)
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    searchMovies('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleSearchClick}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <div className="input-group rounded">
          <Link to="/" onClick={handleSearchClick} className="search-link" >
            <input
              ref={searchInputRef}
              type="search"
              data-testid="search-movies"
              onKeyUp={(e) => searchMovies(e.target.value)}
              className="form-control rounded"
              placeholder="Search movies..."
              aria-label="Search movies"
              aria-describedby="search-addon"
            />
          </Link>
        </div>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>



      </nav>
    </header>
  )
}

export default Header