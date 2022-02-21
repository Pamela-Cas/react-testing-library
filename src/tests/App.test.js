import { render, screen } from '@testing-library/react';

import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
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

    it('É redirecionada para a página inicial ao clicar no link Home.', () => {
      const home = screen.getByRole('link', { name: /home/i });
      userEvent.click(home);

      const homeText = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(homeText).toBeInTheDocument();
    });

    it('É redirecionada para a página about ao clicar no link About.', () => {
      const about = screen.getByRole('link', { name: /about/i });
      userEvent.click(about);

      const aboutText = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(aboutText).toBeInTheDocument();
    });

    it('É redirecionada para a página de favorites'
     + ' ao clicar no link Favorite Pokémons.', () => {
      const favoritePokemons = screen.getByRole('link', { name: /favorite pokémon/i });
      userEvent.click(favoritePokemons);

      const favoriteText = screen.getByRole('heading', { name: /Favorite pokémons/i });
      expect(favoriteText).toBeInTheDocument();
    });

    it('É redirecionada para a página Not Found'
    + ' ao entrar em uma URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/anything-that-dont-makes-sense');

      const notFoundText = screen.getByRole(
        'heading', { name: /Page requested not found/i },
      );
      expect(notFoundText).toBeInTheDocument();
    });
  },
);
