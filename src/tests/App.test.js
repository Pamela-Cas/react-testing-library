import { render, screen } from '@testing-library/react';

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe(
  'Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
    });

    it('O primeiro link deve possuir o texto Home.', () => {
      const home = screen.getByRole('link', { name: /home/i });
      expect(home).toBeInTheDocument();
    });

    it('O segundo link deve possuir o texto About.', () => {
      const about = screen.getByRole('link', { name: /about/i });
      expect(about).toBeInTheDocument();
    });

    it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
      expect(favoritePokemons).toBeInTheDocument();
    });
  },
);
