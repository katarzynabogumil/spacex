import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LaunchItem from '../Components/LaunchItem';
import { mocks } from './mocks';


describe('Launch Item Tests', () => {

  it('Should render the correct launch name', () => {
    render(
      <BrowserRouter>
        <LaunchItem launch={mocks.launches[0]} />
      </BrowserRouter>
    );

    expect(screen.getByText(mocks.launches[0].name)).toBeInTheDocument();
  });
  
  it('Should render correct image if it has a patch', () => {
    render(
      <BrowserRouter>
        <LaunchItem launch={mocks.launches[0]} />
      </BrowserRouter>
    );

    const image = screen.getByAltText('launch patch');
    const imageUrl = mocks.launches[0].links.patch.small;
    expect(image.src).toEqual(imageUrl);
  });

  it('Should render a background if it has no patch', () => {
    const mockWithoutPatch = {
      ...mocks.launches[0], 
      links: {
        patch: {
          small: '',
        }
      }
    };

    render(
      <BrowserRouter>
        <LaunchItem launch={mockWithoutPatch} />
      </BrowserRouter>
    );

    const image = screen.queryByText('launch patch');
    expect(image).toBeNull();

    const background = screen.getByTestId('img-fallback');
    expect(background).toBeInTheDocument();
  });
});