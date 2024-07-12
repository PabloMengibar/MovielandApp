import { render, screen, fireEvent } from '@testing-library/react';
import WatchLater from '../components/WatchLater';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import watchLaterSlice from '../data/watchLaterSlice';
import { BrowserRouter } from 'react-router-dom';
import { moviesMock } from './movies.mocks';

describe('WatchLater Component', () => {
  const mockViewTrailer = jest.fn();

  const setup = (initialState = { watchLater: { watchLaterMovies: [] } }) => {
    const store = configureStore({
      reducer: {
        watchLater: watchLaterSlice.reducer,
      },
      preloadedState: initialState,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <WatchLater viewTrailer={mockViewTrailer} />
        </BrowserRouter>
      </Provider>
    );

    return store;
  };

  it('empty message when watchLaterMovies is empty', () => {
    setup();
    expect(screen.getByText('You have no movies saved to watch later.')).toBeInTheDocument();
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

  it('watch later list when watchLaterMovies is not empty', () => {
    setup({ watchLater: { watchLaterMovies: moviesMock } });
    expect(screen.getByText('Watch Later List')).toBeInTheDocument();
    expect(screen.getByTestId('watch-later-movies')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Empty list' })).toBeInTheDocument();
  });

  it('movie component for each movie in watchLaterMovies', () => {
    setup({ watchLater: { watchLaterMovies: moviesMock } });
    moviesMock.forEach(movie => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it('calls removeAllWatchLater action when "Empty list" button is clicked', () => {
    const store = setup({ watchLater: { watchLaterMovies: moviesMock } });
    const emptyListButton = screen.getByRole('button', { name: 'Empty list' });
    fireEvent.click(emptyListButton);
    expect(store.getState().watchLater.watchLaterMovies).toEqual([]);
  });
});
