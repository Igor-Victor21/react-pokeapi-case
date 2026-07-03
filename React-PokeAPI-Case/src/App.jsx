import style from './App.module.css'
import { useEffect, useState } from 'react'

// importando a url da pasta da api
import { api } from "./api/api"

// Importando informações traduzidas dos Pokémon
import { pokemonInfo } from "./utils/pokemonInfo";

// Importando imagens
import IconFav from './assets/PokeHeart.png'
import IconFavActive from "./assets/IconFavActive.png";

// Importando o nav bar 
import { Nav } from './components/nav';
// Importando o modal do pokémon
import ModalPokemon from "./components/ModalPokemon.jsx";


function App() {

  const [data, setData] = useState([]);
  const [erro, setErro] = useState(false);

  // Variável de estado para paginação
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Variável de estado para detalhes do pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Variável de estado para favoritos
  const [favorites, setFavorites] = useState(() => {
    const storage = localStorage.getItem("favorites");
    return storage ? JSON.parse(storage) : [];
  });

  // Variável de estado para filtrar os Pokémon pelo nome
  const [filterPokemon, setFilterPokemon] = useState("");

  // Variável de estado dos filtros
  const [filterType, setFilterType] = useState("all");
  const [filterTypeName, setFilterTypeName] = useState("Todos os tipos");
  const [filterOrder, setFilterOrder] = useState("Menor número");

  // Abre e fecha os modais dos filtros
  const [openType, setOpenType] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);



  useEffect(() => {

    // Loading do ver mais
    setLoadingMore(true);

    api.get(`/pokemon?limit=20&offset=${offset}`).then(async (response) => {

      const pokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await api.get(pokemon.url);
          return res.data;
        })
      );

      // Se clicar em "Ver mais", adiciona mais 20.
      if (offset === 0) {
        setData(pokemons);
      } else {
        setData((prev) => [...prev, ...pokemons]);
      }

      setLoadingMore(false);

    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        setErro(true);
      }
      console.error(error);
    });
  }, [offset]);

  if (erro) {
    return (<><p>Pokémon não encontrado</p></>)
  }

  // Salvando os pokémon favorito no localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function handleFavorite(pokemon) {

    const exists = favorites.some((item) => item.id === pokemon.id);

    if (exists) {
      setFavorites(
        favorites.filter((item) => item.id !== pokemon.id)
      );
    } else {
      setFavorites([...favorites, pokemon]);
    }

  }


  const filteredPokemons = [...data];

  const pokemonFiltered = filteredPokemons.filter((pokemon) =>
    pokemon.name
      .toLowerCase()
      .includes(filterPokemon.toLowerCase())
  );

  const pokemonType = pokemonFiltered.filter((pokemon) => {

    if (filterType === "all") {
      return true;
    }

    return pokemon.types.some(
      (pokemonType) => pokemonType.type.name === filterType
    );

  });

  pokemonType.sort((a, b) => {

    switch (filterOrder) {

      case "Menor número":
        return a.id - b.id;

      case "Maior número":
        return b.id - a.id;

      case "A-Z":
        return a.name.localeCompare(b.name);

      case "Z-A":
        return b.name.localeCompare(a.name);

      default:
        return 0;
    }

  });

  return (
    <>
      <section id={style.s1}>
        <div className={style.containerFilter}>
          <div className={style.containerFilterInput}>
            <input className={style.filter} type="text" placeholder="Procurar Pokémon..." value={filterPokemon} onChange={(e) => setFilterPokemon(e.target.value)} />
          </div>
          <div className={style.containerButtons}>
            <div className={style.containerButtons}>

              {/* Filtro via botões */}
              <button className={style.buttonsSelect} onClick={() => { setOpenType(true), setOpenOrder(false) }}>{filterTypeName}</button>
              <button className={style.buttonsSelect} onClick={() => { setOpenOrder(true), setOpenType(false) }}>{filterOrder}</button>

              {/* Modal para o filtro da tipagem dos pokémons */}
              {openType && (
                <div className={style.modalOverlay} onClick={() => setOpenType(false)}>

                  <div className={style.modalBottom} onClick={(e) => e.stopPropagation()}>

                    <div className={style.modalLine}></div>

                    <h3 className={style.modalTitle}>Selecione o tipo</h3>

                    <button className={style.modalButton} onClick={() => {
                      setFilterType("all");
                      setFilterTypeName("Todos os tipos");
                      setOpenType(false);
                    }}>Todos os tipos</button>

                    {Object.keys(pokemonInfo).map((type) => (
                      <button
                        className={style.modalButton}
                        key={type}
                        style={{ backgroundColor: pokemonInfo[type].color }}
                        onClick={() => {
                          setFilterType(type);
                          setFilterTypeName(pokemonInfo[type].name);
                          setOpenType(false);
                        }}
                      >
                        {pokemonInfo[type].name}
                      </button>
                    ))}

                  </div>

                </div>
              )}

              {/* Modal do filtro por ordem */}
              {openOrder && (
                <div className={style.modalOverlay} onClick={() => setOpenOrder(false)}>

                  <div className={style.modalBottom} onClick={(e) => e.stopPropagation()}>

                    <div className={style.modalLine}></div>

                    <h3 className={style.modalTitle}>Selecione a ordem</h3>

                    {[
                      "Menor número",
                      "Maior número",
                      "A-Z",
                      "Z-A"
                    ].map((item) => (

                      <button
                        className={style.modalButton}
                        key={item}
                        onClick={() => {
                          setFilterOrder(item);
                          setOpenOrder(false);
                        }}
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

        {/* Exibindo os Pokémon e filtrando (Só pode filtrar os pokémons que estão na tela)*/}
        {pokemonType.map((item) => {

          // Pegando o primeiro tipo do Pokémon
          const mainType = item.types[0].type.name;

          const isFavorite = favorites.some(
            (pokemon) => pokemon.id === item.id
          );

          return (
            <div className={style.containerPokemon} key={item.id} style={{ backgroundColor: pokemonInfo[mainType].backgroundInfoText }}
              onClick={() => {
                setSelectedPokemon(item);
                setOpenModal(true);
              }}
            >

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
                      <img className={style.littleIcon} src={pokemonInfo[type.type.name].littleIcon} alt="Type Pokemons" />
                      {pokemonInfo[type.type.name].name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Container de informação lado direito */}
              <div className={style.backgroundPokemonImg} style={{ backgroundColor: pokemonInfo[mainType].color }}>
                <div className={style.backgroundIcon}>

                  {/* Botão de adcionar aos favoritos */}
                  <button className={style.buttonFav}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(item);
                    }}>
                    <img src={isFavorite ? IconFavActive : IconFav} alt="Favorito"/>
                  </button>

                  <img className={style.backgroundIcon} src={pokemonInfo[mainType].icon} alt="Type Pokemons" />
                  <img className={style.imgPokemon} src={item.sprites.other["official-artwork"].front_default} alt={item.name} />
                </div>
              </div>

            </div>
          );
        })}

        {/* Botão Ver mais, a cada click o sistema exibe 20 Pokémon */}
        <button className={style.buttonsSelect} onClick={() => setOffset(offset + 20)} disabled={loadingMore}>{loadingMore ? "Carregando..." : "Ver mais"}</button>


        <ModalPokemon pokemon={selectedPokemon} open={openModal} onClose={() => setOpenModal(false)} />
        <Nav />

      </section>
    </>
  )
}

export default App
