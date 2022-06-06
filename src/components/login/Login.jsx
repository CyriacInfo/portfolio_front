import React, { useContext } from "react";
import globalContext from "../../contexts/GlobalContext";
import "./login.css";
import axios from "axios";

function Login() {
  const { email, setEmail, password, setPassword, navigate, setUser } =
    useContext(globalContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // eslint-disable-next-line no-alert
      alert("Veuillez fournir votre email et votre mot de passe");
    } else {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
            { email, password },
            { withCredentials: true }
          )
          .then((res) => {
            setUser(res.data);
            // Le localstorage sert a stocké le role
            console.log(res.data);
            localStorage.setItem("userId", res.data.id);
            localStorage.setItem("email", res.data.email);
            navigate("/portfolio");
          });

        // Si l'email ou le mot de passe n'est pas reconnue dans la BDD renvoyé une erreur
      } catch (err) {
        alert("l'email ou le mot de passe est erroné");
      }
    }
  };
  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <h2 className="formTitle">Connection</h2>
      {/* Input nom d'utilisateur */}
      <p className="emailP">Mail :</p>
      <label htmlFor="mail" className="nameLabel">
        <input
          type="email"
          id="mail"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputForm"
        />
      </label>
      {/* Input mot de passe */}
      <p className="emailP">Mot de passe :</p>
      <label htmlFor="password" className="nameLabel">
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputForm"
        />
      </label>
      <input
        className="inputFormBtn"
        type="submit"
        id="loginBtn"
        value="Se Connecter"
      />
    </form>
  );
}

export default Login;
