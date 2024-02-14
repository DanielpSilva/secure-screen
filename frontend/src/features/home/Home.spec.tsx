import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AlertProvider } from '../../providers/AlertContext';
import Home from './Home';

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button correctly', () => {
    render(
      <MemoryRouter>
        <AlertProvider>
          <Home />
        </AlertProvider>
      </MemoryRouter>
    );
    const button = screen.queryByRole('button', {
      name: 'Acessar tela segura',
    });

    expect(button).toBeTruthy();
  });
});
