import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa componente "App":', () => {
  it('Verifica se o primeiro link possui o título "Home"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });

    expect(linkHome).toBeInTheDocument();
    expect(linkHome).toHaveTextContent('Home');

    const textoHome = screen.getByRole('heading', {
      level: 1,
    });

    expect(textoHome).toBeInTheDocument();
  });
  it('Verifica se o segundo link possui o texto "About"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout).toHaveTextContent('About');
  });
  it('Verifica se o terceiro link possui o título "Favorite Pokémons"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(linkFavoritePokemons).toBeInTheDocument();
    expect(linkFavoritePokemons).toHaveTextContent('Favorite Pokémons');
  });
  it(`Teste se a aplicação é redirecionada para a página inicial,na URL /
    ao clicar no link Home da barra de navegação.`, () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkHome = screen.getByRole('link', {
      name: 'Home',
    });

    expect(linkHome).toHaveTextContent('Home');

    userEvent.click(linkHome);

    const textoHome = screen.getByRole('heading', {
      level: 1,
      name: /Pokédex/i,
    });

    expect(textoHome).toBeInTheDocument();
  });
  it('Testa link para "About"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkHome = screen.getByRole('link', {
      name: 'About',
    });

    expect(linkHome).toHaveTextContent('About');

    userEvent.click(linkHome);

    const textoHome = screen.getByRole('heading', {
      level: 2,
      name: /About/i,
    });

    expect(textoHome).toBeInTheDocument();
  });

  it('Testa link para "Favorite Pokémons"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkFavoritePokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(linkFavoritePokemons);

    const textoFavorites = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });

    expect(textoFavorites).toBeInTheDocument();
  });
});
