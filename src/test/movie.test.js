import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Movie from '../components/Movie';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';
import { moviesMock } from './movies.mocks';

describe('Movie Component', () => {
  const mockMovie = moviesMock[0];

  const mockViewTrailer = jest.fn();

  const setup = (initialState = {
    starred: { starredMovies: [] },
    watchLater: { watchLaterMovies: [] },
  }) => {
    const store = configureStore({
      reducer: {
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <Movie movie={mockMovie} viewTrailer={mockViewTrailer} />
      </Provider>
    );

    return store;
  };

  it('movie details correctly', () => {
    setup();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Movie overview')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Inception poster' })).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'
    );
  });

  it('opens and closes the card on click', () => {
    setup();
    const card = screen.getByRole('article', { name: 'Inception' });
    fireEvent.click(card);
    expect(card).toHaveClass('opened');
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(card).not.toHaveClass('opened');
  });

  it('handles starred functionality', () => {
    const store = setup({ starred: { starredMovies: [mockMovie] } });
    const starButton = screen.getByTestId('unstar-link');
    fireEvent.click(starButton);
    expect(store.getState().starred.starredMovies).toEqual([]);
  });

  it('handles watch later functionality', () => {
    const store = setup({ watchLater: { watchLaterMovies: [mockMovie] } });
    const watchLaterButton = screen.getByTestId('remove-watch-later');
    fireEvent.click(watchLaterButton);
    expect(store.getState().watchLater.watchLaterMovies).toEqual([]);
  });

  it('calls viewTrailer function on click', () => {
    setup();
    const viewTrailerButton = screen.getByRole('button', { name: 'View Trailer' });
    fireEvent.click(viewTrailerButton);
    expect(mockViewTrailer).toHaveBeenCalledWith(mockMovie);
  });
});
