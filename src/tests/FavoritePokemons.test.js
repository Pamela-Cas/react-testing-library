import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../functionRenderWithRouter/renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('É exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByRole('link', { name: /More details/i });
    userEvent.click(firstPokemon);
    const firstCheckbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(firstCheckbox);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);

    const starImg = screen.getAllByRole('img', { name: /is marked as favorite/i });
    expect(starImg).toHaveLength(1);
  });
});
