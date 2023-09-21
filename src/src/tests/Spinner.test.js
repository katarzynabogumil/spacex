import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Spinner from '../Components/Spinner';

describe('Spinner Tests', () => {

  it('Should correctly render the spinner with styles', () => {
    render(
      <Spinner />
    );
    
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toHaveClass('spinner');
    expect(spinnerContainer.childNodes.length).toBe(5);
    spinnerContainer.childNodes.forEach((rect, i) => {
      expect(rect.innerHTML).toBe('');
      expect(rect).toHaveClass(`rect${i+1}`);
    });
  });
});