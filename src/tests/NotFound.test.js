import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa as renderizações na página Not Found', () => {
  it(`Teste se página contém um heading 'h2' com o texto 
  'Page requested not found '`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it(` Teste se página mostra a imagem
   'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
