import { render, screen } from '@testing-library/react';
import App from '../App';

test('Should render launch dashboard', () => {
  render(<App />);
  const dashboard = screen.getByTestId("launch-dashboard");
  expect(dashboard).toBeInTheDocument();
});
