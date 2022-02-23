// Realizando o import
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../functionRenderWithRouter/renderWithRouter';
import App from '../App';

// renderizando o about
describe('Teste o componente <About.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });

  // teste h2 com about Pokedex
  it('Contém um heading h2 com o texto About Pokédex', () => {
    const headingPokedex = screen.getByRole(
      'heading', { level: 2, name: /About Pokédex/i },
    );
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  // test imagem pokedex
  it('Contém a imagem de uma Pokédex', () => {
    const imgPokedex = screen.getByAltText(/pokédex/i);
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
