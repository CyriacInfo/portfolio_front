import React, { useContext } from "react";
import globalContext from "../../contexts/GlobalContext";
import "./login.css";

function Login() {
  const { email, setEmail, password, setPassword, setIsConnected, navigate } =
    useContext(globalContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "cyriac.intesse@gmail.com" && password === "123456789") {
      setIsConnected(true);
      setPassword("");
      setEmail("");
      navigate("/portfolio");
    } else {
      setIsConnected(false);
      setPassword("");
      setEmail("");
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
        <input className="inputFormBtn" type="submit" id="loginBtn" value="Se Connecter"/>
    </form>
  );
}

export default Login;
