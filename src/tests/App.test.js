import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(`Testar se o topo da aplicação contém um 
conjunto fixo de links de navegação`, () => {
  it('Verifica se o primeiro link possui o texto "home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });
  it('Verifica se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto "Favorite Pokemons"', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i });

    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página `Not Found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByText(/page requested not found/i);

    expect(notFoundTitle).toBeInTheDocument();
  });
});
