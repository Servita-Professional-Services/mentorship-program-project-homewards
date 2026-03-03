import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

// TODO [CHALLENGE: Testing] - These tests are minimal stubs.
// What else should you test for a Logo component?
// Consider: accessibility attributes, responsive sizing, colour inheritance

describe('Logo', () => {
  it('renders with the default accessible label', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'HomeWard' })).toBeInTheDocument();
  });

  it('accepts a custom accessible label', () => {
    render(<Logo label="My Trust Logo" />);
    expect(screen.getByRole('img', { name: 'My Trust Logo' })).toBeInTheDocument();
  });

  it('renders with a data-testid for integration tests', () => {
    render(<Logo />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
