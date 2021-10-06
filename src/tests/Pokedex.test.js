import { screen } from '@testing-library/react';
import React from 'react';
import { Pokedex } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente "Pokedex"', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex />);

    const textH2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(textH2).toBeInTheDocument();
  });
});
