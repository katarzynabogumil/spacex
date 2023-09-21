import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { mocks } from './mocks';
import { getDifferenceBetweenSets } from './utils';

/*
  Nock is used to intercept network requests. 
  For instance in App.js we are making multiple GET requests when the app mounts to the following URLs:
  - http://cw-api.eu-west-3.elasticbeanstalk.com/movied/discover
  - http://cw-api.eu-west-3.elasticbeanstalk.com/movied/categories
  - http://cw-api.eu-west-3.elasticbeanstalk.com/movied/categories/${id}

  Nock will intercept the request to the API and will return whatever we set in the reply method.
  In this case we will NOT return the real data from http://cw-api.eu-west-3.elasticbeanstalk.com/movied/, instead we are going
  to return the mock data that we have in the mocks folder.

  nock(url).get(endpoint).reply(statusCode, mockData)
*/

// Whenever we make a request in App.js to http://cw-api.eu-west-3.elasticbeanstalk.com/movied/discover the client will get discoverMovies as the response
nock('http://cw-api.eu-west-3.elasticbeanstalk.com/movied')
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get('/discover')
  .reply(200, mocks.discoverMovies);

nock('http://cw-api.eu-west-3.elasticbeanstalk.com/movied')
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get('/categories')
  .reply(200, mocks.categories);

nock('http://cw-api.eu-west-3.elasticbeanstalk.com/movied')
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get(`/categories/${mocks.animationCategory.id}`)
  .reply(200, mocks.animationMovies);

nock('http://cw-api.eu-west-3.elasticbeanstalk.com/movied')
  .persist()
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
  })
  .get(`/categories/${mocks.crimeCategory.id}`)
  .reply(200, mocks.crimeMovies);

describe('Main App Tests', () => {
  it('Should render correct movies and categories', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Discover')).toBeInTheDocument();
      expect(screen.getByText('Coco')).toBeInTheDocument();
      expect(screen.getByText('Terrifier')).toBeInTheDocument();
      expect(screen.getByText('Animation')).toBeInTheDocument();
      expect(screen.getByText('Luck')).toBeInTheDocument();
      expect(screen.getByText('Crime')).toBeInTheDocument();
      expect(screen.getByText('Togo')).toBeInTheDocument();
      expect(screen.getByText('Wire Room')).toBeInTheDocument();
      expect(screen.queryByText('Adventure')).toBeNull();
    });
  });

  it('should add and remove from my list correctly', async () => {
    render(<App />);
    await waitFor(async () => {
      const movieTiles = screen.getAllByTestId('movie_container');
      const moviesToAdd = new Set(['Terrifier 2', 'Wire Room', 'Black Adam']);
      const moviesToRemove = new Set(['Terrifier 2', 'Black Adam']);

      expect(screen.queryByText('MyList')).toBeNull();

      movieTiles.forEach((movieTile) => {
        const movieTitle = movieTile.querySelector('[data-testid="movie_headline_title"]').innerHTML;
        if (moviesToAdd.has(movieTitle)) {
          fireEvent.mouseOver(movieTile);
          const addButton = movieTile.querySelector('[data-testid="movie_headline_btn"]');
          expect(addButton.innerHTML.includes('+')).toBeTruthy();
          fireEvent.click(addButton);
        }
      });

      expect(screen.queryByText('MyList')).toBeInTheDocument();

      let movieRows = screen.getAllByTestId('movie_list_container');
      let myListRow = movieRows.find(row => row.querySelector('[data-testid="list_title"]').innerHTML === 'MyList');
      const myListMovies = myListRow.querySelectorAll('[data-testid="movie_container"]');

      expect(myListMovies.length).toBe(moviesToAdd.size);

      myListMovies.forEach((myListMovie) => {
        const movieTitle = myListMovie.querySelector('[data-testid="movie_headline_title"]').innerHTML;
        fireEvent.mouseOver(myListMovie);
        const movieIcon = myListMovie.querySelector('[data-testid="movie_headline_btn"]');
        expect(moviesToAdd.has(movieTitle)).toBeTruthy();
        expect(movieIcon.innerHTML.includes('✓')).toBeTruthy();
        if (moviesToRemove.has(movieTitle)) {
          fireEvent.click(movieIcon);
        }
      });

      movieRows =  screen.getAllByTestId('movie_list_container');
      myListRow =  movieRows.find(row => row.querySelector('[data-testid="list_title"]').innerHTML === 'MyList');
      const myNewListMovies = myListRow.querySelectorAll('[data-testid="movie_container"]');

      expect(myNewListMovies.length).toBe((moviesToAdd.size - moviesToRemove.size));

      myNewListMovies.forEach((myNewListMovie) => {
        const movieTitle = myNewListMovie.querySelector('[data-testid="movie_headline_title"]').innerHTML;
        const setDifference = getDifferenceBetweenSets(moviesToAdd, moviesToRemove);
        const movieIcon = myNewListMovie.querySelector('[data-testid="movie_headline_btn"]');
        expect(movieIcon.innerHTML.includes('✓')).toBeTruthy();
        expect(setDifference.has(movieTitle)).toBeTruthy();
      });
    });
  });
});
