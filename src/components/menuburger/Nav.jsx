import { NavLink } from "react-router-dom";
import React, { useState, useContext } from "react";
import globalContext from "../../contexts/GlobalContext";
import "./nav.scss";
import logout from "./logout.png";
export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toogleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  const { isConnected, setIsConnected } = useContext(globalContext);
  return (
    <div>
      <div className="navigation">
        <ul className={hamburgerOpen ? "navUlClose" : "navUlOpen"}>
          <NavLink className="lienNav" to="/" onClick={toogleHamburger}>
            Accueil
          </NavLink>
          <NavLink
            className="lienNav"
            to="/portfolio"
            onClick={toogleHamburger}
          >
            Mon Portfolio
          </NavLink>
          <NavLink className="lienNav" to="/cv" onClick={toogleHamburger}>
            Mon CV
          </NavLink>
          {isConnected ? (
            <NavLink className="lienNav" to="/" onClick={toogleHamburger}>
              Espace Utilisateur
            </NavLink>
          ) : (
            <NavLink className="lienNav" to="/login" onClick={toogleHamburger}>
              se connecter
            </NavLink>
          )}
        </ul>
        <button
          type="button"
          className={hamburgerOpen ? "modeOuvert" : "modeFerme"}
          onClick={toogleHamburger}
        >
          <div className=" burger1" />
          <div className=" burger2" />
          <div className=" burger3" />
        </button>
        <h2 className="navTitle">INTESSE Cyriac</h2>
        {isConnected ? (
          <div className="useConnected">
            {" "}
            <p className="white">Connecté</p>
            <img
              className="navLogOut"
              src={logout}
              alt=""
              onClick={() => setIsConnected(false)}
            />
          </div>
        ) : (
          <p className="navLogOut white">Visiteur</p>
        )}
      </div>
    </div>
  );
}
