import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MovieContext } from '../App';
import MovieList from '../Components/MovieList';
import { mocks } from './mocks';

let mockFunction;

beforeEach(() => {
  mockFunction = jest.fn();
});

describe('Movie List Tests', () => {

  it('Should render list with the correct movie details', () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieList movies={mocks.discoverMovies} title='Discover' />
      </MovieContext.Provider>
    );
    
    const discoverMoviesSet = new Set([...mocks.discoverMovies.map(discMov => discMov.title)]);
    const movieRow = screen.getByTestId('movie_list_container');
    const rowTitle = movieRow.querySelector('[data-testid="list_title"]').innerHTML;
    const movies = movieRow.querySelectorAll('[data-testid="movie_container"]');
    expect(rowTitle).toBe('Discover');
    expect(movies.length).toBe(mocks.discoverMovies.length);

    movies.forEach((movie)=> {
      const movieTitle = movie.querySelector('[data-testid="movie_headline_title"]').innerHTML;
      expect(discoverMoviesSet.has(movieTitle)).toBeTruthy();
    });
  });

  it('Should not render anything if the movie list is empty', () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieList movies={[]} title='Discover' />
      </MovieContext.Provider>
    );
    const movieRow = screen.getByTestId('movie_list_container');
    expect(movieRow.querySelector('[data-testid="list_title"]')).toBeNull();
  });
});