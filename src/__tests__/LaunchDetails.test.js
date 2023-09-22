import '@testing-library/jest-dom';
import nock from 'nock';
import { waitFor, render, screen } from '@testing-library/react';
import * as Router from 'react-router-dom';
import LaunchDetails from '../Components/LaunchDetails';
import { mocks } from './mocks';

const URL = 'https://api.spacexdata.com/v5/launches';
const BODY = "{\"query\":{\"_id\":\"1\"},\"options\":{\"sort\":{\"name\":\"asc\"},\"pagination\":false,\"populate\":[\"rocket\",\"launchpad\",\"crew.crew\"]}}"

beforeEach(() => {
  nock(URL)
    .post('/query/', BODY)
    .reply(200, {docs: mocks.launches});
});

afterEach(() => {
  nock.cleanAll()
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}))

describe('Launch Details Tests', () => {

  it('Should fetch launch data', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

    render(
      <Router.BrowserRouter>
        <LaunchDetails />
      </Router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('launch-details')).toBeInTheDocument();
    });
  });

  it('Should render the correct launch name', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

    render(
      <Router.BrowserRouter>
        <LaunchDetails />
      </Router.BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mocks.launch.name)).toBeInTheDocument();
    });
  });

  it('Should render correct image if it has a flickr path', async () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });

    render(
      <Router.BrowserRouter>
        <LaunchDetails />
      </Router.BrowserRouter>
    );

    await waitFor(() => {
      const image = screen.getByAltText('launch photograph');
      const imageUrl = mocks.launch.links.flickr.original[0];
      expect(image.src).toEqual(imageUrl);
    });
  });

});
