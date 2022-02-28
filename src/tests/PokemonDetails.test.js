import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(` Teste se as informações detalhadas do Pokémon,
 selecionado são mostradas na tela.`, () => {
  it(` A página deve conter um texto <name> Details, 
  onde <name> é o nome do Pokémon.`, () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    const PokemonDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(PokemonDetails).toBeInTheDocument();
    expect(urlPokemon).not.toBeVisible();
    const sumary = screen.getByRole('heading', { name: /summary/i });
    expect(sumary).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com o resumo
     do Pokémon específico sendo visualizado.`, () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    const paragrafo = screen.getByText(
      / hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(paragrafo).toBeInTheDocument();
  });

  it(`Na seção de detalhes deverá existir um heading h2 
  com o texto Game Locations of name onde <name>é o nome do 
  Pokémon exibido.`, () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    const location = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(location).toBeInTheDocument();
    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationtwo = screen.getByText(/kanto power plant/i);
    expect(locationOne && locationtwo).toBeInTheDocument();
  });

  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    const imgPokemon = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    console.log(imgPokemon);
    expect(imgPokemon).toHaveLength(2);
    expect(imgPokemon[1].src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  it('', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoriteLink);
    const starFavorite = screen.getAllByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(starFavorite).toBeDefined();
  });
});
