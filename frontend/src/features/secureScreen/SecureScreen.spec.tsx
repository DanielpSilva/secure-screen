import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AlertProvider } from '../../providers/AlertContext';

import SecureScreen from './SecureScreen';

describe('Secure Screen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button correctly', () => {
    render(
      <MemoryRouter>
        <AlertProvider>
          <SecureScreen />
        </AlertProvider>
      </MemoryRouter>
    );
    const button = screen.queryByRole('button', {
      name: 'Sair',
    });

    expect(button).toBeTruthy();
  });

  it('renders the exit button correctly with the right href', () => {
    render(
      <MemoryRouter>
        <AlertProvider>
          <SecureScreen />
        </AlertProvider>
      </MemoryRouter>
    );

    const exitButton = screen.getByRole('button', { name: 'Sair' });

    expect(exitButton).toHaveAttribute('href', '/home');
  });
});
