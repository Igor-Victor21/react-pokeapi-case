import style from './App.module.css'

import { useEffect, useState } from 'react'

// importando a url da pasta da api
import { api } from "./api/api"

// Importando informações traduzidas dos pokemons
import { pokemonInfo } from "./utils/pokemonInfo";

function App() {

  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.get("/pokemon?limit=20").then(async (response) => {

      const pokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await api.get(pokemon.url);
          return res.data;
        })
      );

      setData(pokemons);

    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        setErro(true);
      }
      console.error(error);
    });
  }, []);

  if (erro) {
    return (<><p>Pokémon não encontrado</p></>)
  }


  return (
    <>
      <section id={style.s1}>
        <div className={style.containerFilter}>
          <div className={style.containerFilterInput}>
            <input className={style.filter} type="text" placeholder='Procurar Pókemon...' />
          </div>
          <div className={style.containerButtons}>
            <button className={style.buttonsSelect}>Todos os tipos</button>
            <button className={style.buttonsSelect}>Menor número</button>
          </div>
        </div>

        {/* exibindo os pokémons */}
        {data.map((item) => {

          // Pegando o primeiro tipo do Pokémon
          const mainType = item.types[0].type.name;

          return (
            <div className={style.containerPokemon} style={{ backgroundColor: pokemonInfo[mainType].backgroundInfoText }} key={item.id}>

              <div className={style.containerInfoPokemon}>
                <p className={style.numberPokemon}>
                  {item.id < 10
                    ? `Nº00${item.id}`
                    : item.id < 100
                      ? `Nº0${item.id}`
                      : `Nº${item.id}`}
                </p>

                <p className={style.namePokemon}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </p>

                <div className={style.typePokemon}>
                  {item.types.map((type) => (
                    <span key={type.slot} style={{backgroundColor: pokemonInfo[type.type.name].color}}>
                      <img className={style.littleIcon} src={pokemonInfo[type.type.name].littleIcon} alt="Type Pokemons"/>
                      {pokemonInfo[type.type.name].name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={style.backgroundPokemonImg} style={{ backgroundColor: pokemonInfo[mainType].color }}>
                <div className={style.backgroundIcon}>

                  <img className={style.backgroundIcon} src={pokemonInfo[mainType].icon} alt="Type Pokemons"/>
                  <img className={style.imgPokemon} src={item.sprites.other["official-artwork"].front_default} alt={item.name} />
                </div>
              </div>

            </div>
          );
        })}



      </section>
    </>
  )
}

export default App
