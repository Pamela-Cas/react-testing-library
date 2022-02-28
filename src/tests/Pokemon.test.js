import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(`Teste se é renderizado um card com as informações de 
determinado pokémon`, () => {
  it(`Teste se é renderizado um card com as 
informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela;
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    // O tipo correto do pokémon deve ser mostrado na tela.
    const typesOfPokemons = screen.getAllByText('Electric');
    expect(typesOfPokemons).toHaveLength(2);
  });
  it(` O peso médio do pokémon deve ser exibido com um texto no formato 
    Average weight: <value> <measurementUnit>; onde <value> e '<measurementUnit>'
  são, respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
    renderWithRouter(<App />);
    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight).toBeInTheDocument();
  });
  it('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const altName = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(altName).toBeInTheDocument();
  });
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    expect(urlPokemon).toHaveAttribute('href', '/pokemons/25');
    const imgPikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imgPikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(` Teste se ao clicar no link de navegação do Pokémon,
     é feito o redirecionamento da aplicação para a página
      de detalhes de Pokémon. `, () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);
    const sumary = screen.getByRole('heading', { name: /summary/i });
    expect(sumary).toBeInTheDocument();
    expect(urlPokemon).toHaveAttribute('href', '/pokemons/25');
  });
  it(' Teste se existe um ícone de estrela nos Pokémons favoritados ', () => {
    renderWithRouter(<App />);
    const urlPokemon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(urlPokemon);

    const checked = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checked);
    expect(checked).toBeChecked(true);

    const starFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(starFavorite).toBeInTheDocument();
    const starInDocuemnt = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,

    });
    expect(starInDocuemnt).toBeInTheDocument();
    expect(starInDocuemnt).toHaveAttribute('src', '/star-icon.svg');
  });
});
