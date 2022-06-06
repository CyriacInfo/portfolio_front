import React, { useState, useContext } from "react";
import globalContext from "../../contexts/GlobalContext";
import "./nav.scss";
import logout from "./logout.png";
import axios from "axios";
export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toogleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  const { user, navigate, setUser } = useContext(globalContext);

  const getOutOfHere = async () => {
    localStorage.clear();
    axios.get = `${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`;
    navigate("/portfolio");
    setUser();
  };
  return (
    <div>
      <div className="navigation">
        <ul className={hamburgerOpen ? "navUlClose" : "navUlOpen"}>
          <li
            className="lienNav"
            onClick={() => {
              toogleHamburger();
              navigate("/");
            }}
          >
            Accueil
          </li>
          <li
            className="lienNav"
            onClick={() => {
              toogleHamburger();
              navigate("/portfolio");
            }}
          >
            Mon Portfolio
          </li>
          <li
            className="lienNav"
            onClick={() => {
              toogleHamburger();
              navigate("/cv");
            }}
          >
            Mon CV
          </li>
          {user ? (
            <li
              className="lienNav"
              onClick={() => {
                toogleHamburger();
                navigate("/");
              }}
            >
              Espace Utilisateur
            </li>
          ) : (
            <li
              className="lienNav"
              onClick={() => {
                toogleHamburger();
                navigate("/login");
              }}
            >
              se connecter
            </li>
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
        {user ? (
          <div className="useConnected">
            {" "}
            <p className="white">Connecté</p>
            <img
              className="navLogOut"
              src={logout}
              alt=""
              onClick={getOutOfHere}
            />
          </div>
        ) : (
          <p className="navLogOut white">Visiteur</p>
        )}
      </div>
    </div>
  );
}
