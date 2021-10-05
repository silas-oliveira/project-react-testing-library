import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa página Favorite Pokemons', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const linkFavorite = screen.getByText(/No favorite pokemon found/i);

    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const tituloPage = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });

    const buttonElementPokemon = screen.getByRole('button', {
      name: /fire/i,
    });

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(tituloPage).toBeInTheDocument();
    userEvent.click(buttonElementPokemon);
    userEvent.click(moreDetails);

    const buttonFavoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(buttonFavoritePokemon);

    expect(buttonFavoritePokemon).toBeChecked(true);
  });
});
