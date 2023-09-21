import { categories } from './categories';
import { discoverMovies } from './discoverMovies';
import { animationMovies } from './animationMovies';
import { crimeMovies } from './crimeMovies';

export const mocks = { 
  categories, 
  discoverMovies, 
  animationMovies, 
  crimeMovies,
  animationCategory: categories[0],
  crimeCategory: categories[1],
  noBackdropMovie: crimeMovies[1],
  movieOnMyList: crimeMovies[0],
  movie: animationMovies[0]
};