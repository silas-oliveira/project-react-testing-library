import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa componente notFound ', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const textNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    const cryingEmoji = screen.getByRole('img', {
      name: /crying emoji/i,
    });

    expect(textNotFound).toBeInTheDocument();
    expect(cryingEmoji).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const imageCrying = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(imageCrying).toBeInTheDocument();
  });
});
