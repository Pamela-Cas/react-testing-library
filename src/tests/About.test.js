import React from 'react';
import renderWithRouter from '../functionRenderWithRouter/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  // Teste se a página contém dois parágrafos com texto sobre a Pokédex.
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const p1 = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';

    const p2 = 'One can filter Pokémons by type, and see'
    + ' more details for each one of them';
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(p1);
    const paragraph2 = getByText(p2);
    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  // Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png
  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img', { name: /Pokédex/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
