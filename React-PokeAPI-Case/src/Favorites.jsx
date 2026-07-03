import style from "./Favorites.module.css";

import { useEffect, useState } from "react";

import { pokemonInfo } from "./utils/pokemonInfo";

import IconFavActive from "./assets/IconFavActive.png";

import { Nav } from './components/nav';

function Favorites() {

  // Estado dos favoritos
  const [favorites, setFavorites] = useState([]);

  // Carrega os favoritos do localStorage
  useEffect(() => {

    const storage = localStorage.getItem("favorites");

    if (storage) {
      setFavorites(JSON.parse(storage));
    }

  }, []);

  // Remove dos favoritos
  function handleFavorite(id) {

    const updatedFavorites = favorites.filter(
      (pokemon) => pokemon.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

  }

  return (
    <section id={style.s1}>

      <h2 className={style.title}>Favoritos</h2>

      {/* Exibindo os Pokémon favoritos */}
      {favorites.map((item) => {

        // Pegando o primeiro tipo do Pokémon
        const mainType = item.types[0].type.name;

        return (
          <div className={style.containerPokemon} style={{ backgroundColor: pokemonInfo[mainType].backgroundInfoText }} key={item.id}>

            {/* Container de informações lado esquerdo */}
            <div className={style.containerInfoPokemon}>

              {/* Númeração do Pokémon */}
              <p className={style.numberPokemon}>
                Nº{String(item.id).padStart(3, "0")}
              </p>

              {/* Nome dos Pokémon */}
              <p className={style.namePokemon}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </p>

              {/* Tipagem do Pokémon */}
              <div className={style.typePokemon}>
                {item.types.map((type) => (
                  <span key={type.slot} style={{ backgroundColor: pokemonInfo[type.type.name].color }}>
                    <img
                      className={style.littleIcon}
                      src={pokemonInfo[type.type.name].littleIcon}
                      alt="Type Pokemons"
                    />
                    {pokemonInfo[type.type.name].name}
                  </span>
                ))}
              </div>

            </div>

            {/* Container de informação lado direito */}
            <div
              className={style.backgroundPokemonImg}
              style={{ backgroundColor: pokemonInfo[mainType].color }}
            >
              <div className={style.backgroundIcon}>

                {/* Botão de remover dos favoritos */}
                <button
                  className={style.buttonFav}
                  onClick={() => handleFavorite(item.id)}
                >
                  <img
                    src={IconFavActive}
                    alt="Favorito"
                  />
                </button>

                <img
                  className={style.backgroundIcon}
                  src={pokemonInfo[mainType].icon}
                  alt="Type Pokemons"
                />

                <img
                  className={style.imgPokemon}
                  src={item.sprites.other["official-artwork"].front_default}
                  alt={item.name}
                />

              </div>
            </div>

          </div>
        );
      })}
      <Nav />
    </section>
  );
}

export default Favorites;