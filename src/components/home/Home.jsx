import React, { useContext } from "react";
import globalContext from "../../contexts/GlobalContext";
import "./home.css";
import pdfFile from "./myCv.pdf"
function Home() {
  const { navigate } = useContext(globalContext);
  return (
    <div className="homeContainer">
      <h1 className="homeTitle">Bienvenu sur mon site !</h1>
      <p className="homeParaf">
        Vous pourrez retrouver mes créations dans la partie Portfolio et mon CV
        sur le boutton Curriculum Vitae
      </p>
      <div className="homeFlexBtn">
        <button
          type="button"
          className="homeBtn"
          onClick={() => navigate("/portfolio")}
        >
          Portfolio
        </button>
        <button type="button" className="homeBtn" onClick={() => window.open(pdfFile)}>
          Curriculum vitæ
        </button>
      </div>
    </div>
  );
}

export default Home;
