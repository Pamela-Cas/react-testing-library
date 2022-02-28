import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes os componentes da página Favorite Pokemons', () => {
  it(`Teste se é exibido na tela a mensagem 'No favorite pokemon found',
   se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favoriteLink);

    const favorite = screen.getByText(/no favorite pokemon found/i);
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const starFavorite = screen.getAllByRole('img', { name: /is marked as favorite/i });
    expect(starFavorite).toBeDefined();
  });
});
