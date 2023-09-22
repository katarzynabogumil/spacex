import '@testing-library/jest-dom';
import nock from 'nock';
import { waitFor, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LaunchDashboard from '../Components/LaunchDashboard';
import { mocks } from './mocks';

const URL = 'https://api.spacexdata.com/v5/launches';
const BODY = "{\"query\":{},\"options\":{\"sort\":{\"name\":\"asc\"},\"pagination\":false,\"populate\":[\"rocket\",\"launchpad\",\"crew.crew\"]}}"

beforeEach(() => {
  nock(URL)
    .post('/query/', BODY)
    .reply(200, {docs: mocks.launches});
});

afterEach(() => {
  nock.cleanAll()
});

describe('Launch Dashboard Tests', () => {

  it('Should render the search bar', async () => {
    render(
      <BrowserRouter>
        <LaunchDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    });
  });

  it('Should render the filter bar', async () => {
    render(
      <BrowserRouter>
        <LaunchDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    });
  });
  
  it('Should render launch dashboard panel', async () => {
    render(
      <BrowserRouter>
        <LaunchDashboard />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('launch-dashboard')).toBeInTheDocument();
    });
  });

  it('Should render launch names', async () => {
    render(
      <BrowserRouter>
        <LaunchDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mocks.launches[0].name)).toBeInTheDocument();
    });
  });
  
});
