/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalContext from "../../../contexts/GlobalContext";
import "./article.css";

function Article() {
  const { id } = useParams();

  const {
    isConnected,
    isVisibleUpdate,
    setIsVisibleUpdate,
    isVisibleDelete,
    setIsVisibleDelete,
    setSelectId,
    navigate,
    isRefresh,
    setIsRefresh,
  } = useContext(globalContext);

  const [getThisArticle, setGetThisArticle] = useState();
  const [lanArray, setLanArray] = useState();
  const [boolDelete, setBoolDelete] = useState(false);

  const openDelete = () => {
    setBoolDelete(true);
    setIsVisibleDelete(false);
  };

  useEffect(() => {
    if (boolDelete === true) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/articles/${id}`)
        .then(() => {
          setIsVisibleDelete(false);
          setBoolDelete(false);
          setIsRefresh(true);
        })
        .catch((err) => alert(err.message));
      navigate("/portfolio");
    }
  }, [boolDelete]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/articles/${id}`)
      .then((res) => {
        setGetThisArticle(res.data);
        setLanArray(res.data.technologies.split(","));
        console.log(lanArray);
        setSelectId(id);
      });
  }, []);

  return (
    <div>
      {isVisibleDelete ? (
        <div className="modalDeleteContainer">
          <div className="exitModal">
            <button
              className="exitButton"
              type="button"
              onClick={() => setIsVisibleDelete(false)}
            >
              X
            </button>
          </div>
          <div className="modalDeleteForm">
            <h2 className="modalUpdateTitle">
              Voulez-vous vraiment supprimer ce Projet ?
            </h2>
            <div className="flexBool">
              <button
                type="button"
                className="articleBtn"
                onClick={openDelete}
              >
                Oui
              </button>
              <button
                type="button"
                className="articleBtn"
                onClick={() => setIsVisibleDelete(false)}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {getThisArticle ? (
        <div className="articleContainer">
          <img
            className="articleImg"
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${getThisArticle.imgName}`}
            alt="Img of topic"
          />
          <h2 className="articleTitle">{getThisArticle.title}</h2>

          <div className="littleFlex">
            <h2 className="littleTitle">Description :</h2>
            <p className="littleText">{getThisArticle.description}</p>
          </div>
          <div className="logoList">
            {lanArray
              ? lanArray.map((item, index) => (
                  <div className="logoLine" id={index}>
                    <h3 className="logoTitle">{item}</h3>
                    <img
                      className="logoImg"
                      src={`${process.env.REACT_APP_BACKEND_URL}/images/${item}.png`}
                      alt={`logo ${item}`}
                    />
                  </div>
                ))
              : null}
          </div>
          <div className="littleFlex">
            <h2 className="littleTitle">Details</h2>
            <p className="littleText">{getThisArticle.paraf}</p>
          </div>
          {isConnected ? (
            <div className="flexBtnAdmin">
              <button
                className="articleBtn"
                type="button"
                onClick={() => setIsVisibleUpdate(!isVisibleUpdate)}
              >
                Modifier
              </button>
              <button
                className="articleBtn"
                type="button"
                onClick={() => setIsVisibleDelete(!isVisibleDelete)}
              >
                Supprimer
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div>Chargement en cours...</div>
      )}
    </div>
  );
}

export default Article;
