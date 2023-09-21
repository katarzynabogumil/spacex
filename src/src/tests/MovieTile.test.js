import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieContext } from '../App';
import MovieTile from '../Components/MovieTile';
import { mocks } from './mocks';

const baseImageUrl = 'https://image.tmdb.org/t/p/w300/';
const noBackdropPathUrl = 'https://dz7u9q3vpd4eo.cloudfront.net/wp-content/legacy/posts/4462a9f8-6c2e-404d-bc09-951ee33f4750.jpg';

let mockFunction;

beforeEach(() => {
  mockFunction = jest.fn();
});

describe('Movie Tile Tests', () => {

  it('Should render the movie title correctly', () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieTile movie={mocks.movie} />
      </MovieContext.Provider>
    );

    expect(screen.getByText(mocks.movie.title)).toBeInTheDocument();
  });

  it('Should render correct movie image if it has a backdrop path', () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieTile movie={mocks.movie} />
      </MovieContext.Provider>
    );

    const movie = screen.getByAltText('movie cover');
    const imageUrl = baseImageUrl + mocks.movie.backdrop_path;
    expect(movie.src).toEqual(imageUrl);
  });

  it('Should render correct movie image when no backdrop path', () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        {/* Movie with no backdrop path */}
        <MovieTile movie={mocks.noBackdropMovie} /> 
      </MovieContext.Provider>
    );

    const movie = screen.getByAltText('movie cover');
    expect(movie.src).toEqual(noBackdropPathUrl);
  });

  it('Should display the plus/check icon when hovering over the movie tile', async () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieTile movie={mocks.movie} />
      </MovieContext.Provider>
    );

    expect(screen.queryByTestId('movie_headline_btn')).toBeNull();
    fireEvent.mouseOver(screen.getByTestId('movie_container'));
    expect(screen.queryByTestId('movie_headline_btn')).toBeVisible();
    fireEvent.mouseLeave(screen.getByTestId('movie_container'));
    expect(screen.queryByTestId('movie_headline_btn')).toBeNull();
  });

  it('should call addMyList function with the correct arguments when clicking the icon', async () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieTile movie={mocks.movie} />
      </MovieContext.Provider>
    );

    fireEvent.mouseOver(screen.getByTestId('movie_container'));
    expect(screen.queryByText('+')).toBeInTheDocument();
    expect(mockFunction).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByTestId('movie_headline_btn'));
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith(mocks.movie.id);
  });

  it('should render a checkmark if the movie is in my list and should trigger addMyList when clicked too', async  () => {
    render(
      <MovieContext.Provider value={{ addMyList: mockFunction }}>
        <MovieTile movie={mocks.movieOnMyList} /> 
      </MovieContext.Provider>
    );

    expect(mockFunction).toHaveBeenCalledTimes(0);
    fireEvent.mouseOver(screen.getByTestId('movie_container'));
    expect(screen.queryByText('✓')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('movie_headline_btn'));
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith(mocks.movieOnMyList.id);
  });
});
