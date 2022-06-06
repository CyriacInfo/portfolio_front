/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import "./portfolio.css";
import axios from "axios";
import globalContext from "../../contexts/GlobalContext";
import ModalPost from "./modalPost/ModalPost";

function Portfolio() {
  const {
    articlesArray,
    setArticlesArray,
    isVisiblePost,
    setIsVisiblePost,
    navigate,
    isRefresh,
    setIsRefresh,
    user,
  } = useContext(globalContext);

  const [filterSearch, setFilterSearch] = useState();

  useEffect(() => {
    if (isRefresh === true) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/articles`,
      }).then((res) => {
        setArticlesArray(res.data);
        setIsRefresh(false);
      });
    }
  }, [isRefresh]);

  return (
    <div>
      <div className="portfolioContainer">
        {isVisiblePost ? <ModalPost /> : null}
        {user ? (
          <div className="portfolioFlexBtnPost">
            <button className="btnPost" type="button" onClick={() => setIsVisiblePost(true)}>
              Poster un Article
            </button>
          </div>
        ) : null}
        <h2 className="portfolioTitle">Mes créations !</h2>
        <input
          className="portInput"
          type="text"
          placeholder=" ex: Blog"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
        />
        <div className="portfolioList">
          {articlesArray
            ? articlesArray
                .filter(
                  (filter) =>
                    !filterSearch || filter.title.includes(filterSearch)
                )
                .map((item) => (
                  <div
                    className="cardItem"
                    onClick={() => navigate(`/article/${item.id}`)}
                  >
                    <img
                      className="cardImg"
                      src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.imgName}`}
                      alt="img of Topic"
                    />
                    <h3 className="cardTitle">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
