import style from "./Nav.module.css";
import { NavLink } from "react-router-dom";

import IconPokeball from "../assets/IconPokeball.png";
import IconFavActive from "../assets/IconFavActive.png";

export function Nav() {
    return (
        <nav className={style.nav}>

            <NavLink to="/" className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item}>
                <img src={IconPokeball} alt="Pokédex" />
                <span>Pokédex</span>
            </NavLink>

            <NavLink to="/dashboard-fav" className={({ isActive }) => isActive ? `${style.item} ${style.active}` : style.item}>
                <img src={IconFavActive} alt="Favoritos" />
                <span>Favoritos</span>
            </NavLink>

        </nav>
    );
}