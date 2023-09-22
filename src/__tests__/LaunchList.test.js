import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LaunchList from '../Components/LaunchList';
import { mocks } from './mocks';

describe('Launch List Tests', () => {

  it('Should render list with the correct launch details', () => {
    render(
      <BrowserRouter>
        <LaunchList launches={mocks.launches} />
      </BrowserRouter>
    );
    const launches = screen.getAllByTestId('launch-container');
    expect(launches.length).toBe(mocks.launches.length);
  });
  
  it('Should not render anything if the list is empty', () => {
    render(
      <BrowserRouter>
        <LaunchList launches={[]} />
      </BrowserRouter>
    );

    const launches = screen.queryByTestId('launch-container');
    expect(launches).toBeNull();
  });

  
});