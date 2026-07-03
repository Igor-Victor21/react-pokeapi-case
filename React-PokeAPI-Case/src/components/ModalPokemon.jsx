import style from "./ModalPokemon.module.css";

import { pokemonInfo } from "../utils/pokemonInfo";

function ModalPokemon({ pokemon, open, onClose }) {

    if (!open || !pokemon) return null;

    const mainType = pokemon.types[0].type.name;

    return (

        // onClose caso clique fora do modal o modal desaparece
        <div className={style.overlay} onClick={onClose}>

            <div className={style.modal} onClick={(e) => e.stopPropagation()}>

                {/* botão de fechar o modal */}
                <button className={style.close} onClick={onClose}>x</button>

                {/* Img Pokémon */}
                <img className={style.image} src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />

                {/* Nome Pokémon */}
                <h2>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h2>

                {/* Número do Pokémon */}
                <p>
                    Nº {String(pokemon.id).padStart(3, "0")}
                </p>

                {/* Tipagem do Pokémon */}
                <div className={style.types}>

                    {pokemon.types.map((type) => (

                        <span key={type.slot} style={{ backgroundColor: pokemonInfo[type.type.name].color }}>
                            {pokemonInfo[type.type.name].name}
                        </span>

                    ))}

                </div>

                {/* Informações do Pokémon */}
                <div className={style.info}>

                    <p>
                        <strong>Altura:</strong> {pokemon.height / 10} m
                    </p>

                    <p>
                        <strong>Peso:</strong> {pokemon.weight / 10} kg
                    </p>

                    <p>

                        <strong>Habilidades:</strong>

                        {" "}

                        {pokemon.abilities
                            .map(item => item.ability.name)
                            .join(", ")}

                    </p>

                </div>

                {/* Status do Pokémon  */}
                <div className={style.stats}>

                    {pokemon.stats.map((stat) => (

                        <div key={stat.stat.name}>

                            <span>

                                {stat.stat.name}

                            </span>

                            <strong>

                                {stat.base_stat}

                            </strong>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ModalPokemon;