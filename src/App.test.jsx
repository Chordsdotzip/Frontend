import App from './App';
import { render, screen } from '@testing-library/react';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    const message = screen.queryByText(/Extract Chords From Song/i);
    expect(message).toBeVisible();
  });
});
