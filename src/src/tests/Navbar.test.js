import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '../Components/Navbar';

describe('Navbar Tests', () => {

  it('Should correctly render the navbar with styles', () => {
    render(
      <Navbar />
    );
    
    expect(screen.getByTestId('navbar')).toHaveClass('navbar');
    const navbarLogo = screen.getByTestId('navbar_logo');
    const navbarSearchIcon = screen.getByTestId('navbar_search_icon');
    expect(navbarLogo).toHaveClass('navbar_logo');
    expect(navbarLogo.src).toBe('http://localhost/logo.png');
    expect(navbarLogo.alt).toBe('netflix logo');
    expect(navbarSearchIcon).toHaveClass('navbar_search_icon');
    expect(navbarSearchIcon.src).toBe('http://localhost/search.svg');
    expect(navbarSearchIcon.alt).toBe('search icon');
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});