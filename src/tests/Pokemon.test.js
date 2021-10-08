import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testa o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonAll);

    const namePokemon = screen.getByText(/pikachu/i);
    const typePokemon = screen.getByTestId('pokemon-type');
    const averageWeightPokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const imgPokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    const buttonType = screen.getByRole('button', {
      name: /electric/i,
    });

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveAttribute('data-testid', 'pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(averageWeightPokemon).toBeInTheDocument();
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    expect(buttonType).toBeInTheDocument();
  });

  it(`Teste se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkMoreDetails).toBeInTheDocument();
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkMoreDetails);

    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });

    expect(summary).toBeInTheDocument();
  });

  it(`Teste também se a URL exibida no navegadormuda para /pokemon/<id>,
  onde <id>é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetails);

    const buttonFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    userEvent.click(buttonFavorite);

    history.push('/');

    const iconFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
