import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa as renderizações na página About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const infoPokedex = screen.getByText(
      /This application simulates a Pokédex/i,
    );
    expect(infoPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const tagParagrafo = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(tagParagrafo).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const ParagrafoOne = screen.getByText(
      /a digital encyclopedia containing all/i,
    );
    const Paragrafotwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(ParagrafoOne && Paragrafotwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imgPokedex).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
