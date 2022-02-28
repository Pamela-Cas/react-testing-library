import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa aplicações na página HOME', () => {
  it('Teste se página contém um heading `h2` com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const Encountered = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(Encountered).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
   quando o botão 'Próximo pokémon' é clicado`, () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextButton && nextPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemon2 = screen.getByText(/caterpie/i);
    expect(nextButton && nextPokemon2).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemon3 = screen.getByText(/ekans/i);
    expect(nextButton && nextPokemon3).toBeInTheDocument();
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const lastPokemon = screen.getByText(/dragonair/i);
    expect(nextButton && lastPokemon).toBeInTheDocument();
    userEvent.click(nextButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const allFilter = screen.getAllByTestId('pokemon-type-button');
    const lengthNumber = 7;
    expect(allFilter).toHaveLength(lengthNumber);

    const filterFire = screen.getByRole('button', {
      name: /fire/i,
    });
    const filterBug = screen.getByRole('button', { name: /bug/i });

    expect(filterBug && filterFire).toBeInTheDocument();
    // verifica se navega dentro do filtro espeficificado
    userEvent.click(filterFire);
    const chamander = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(chamander).toBeInTheDocument();
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextButton);

    const rapidash = screen.getByRole('img', {
      name: /rapidash sprite/i,
    });
    expect(rapidash).toBeInTheDocument();

    // verifica se o botão all está sempre aparecendo.
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeVisible();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(nextButton);
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
