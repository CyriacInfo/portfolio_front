import axios from "axios";
import React, { useContext, useState } from "react";
import globalContext from "../../../contexts/GlobalContext";
import "./modalPost.css";

function ModalPost() {
  const { setIsVisiblePost, setIsRefresh } = useContext(globalContext);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [checked, setChecked] = useState([]);
  const [image, setImage] = useState();
  const [paraf, setParaf] = useState();
  const [urlProject, setUrlProject] = useState();
  const techno = [
    "PHP",
    "Symfony",
    "JS",
    "React.js",
    "Node.js",
    "Express",
    "Bootstrap",
    "Angular.js",
    "Vue.js",
    "Java",
    "ReactNative",
    "C++",
    "Ruby",
    "C#",
    "Wordpress",
    "Swift",
    "TypeScript",
    "Rust",
  ];

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleSubmit = () => {
    const strChecked = checked.join();
    const newArticle = new FormData();
    const technologies = strChecked;

    newArticle.append("title", title);
    newArticle.append("description", description);
    newArticle.append("paraf", paraf);
    newArticle.append("technologies", technologies);
    newArticle.append("urlProject", urlProject);
    newArticle.append("file", image);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/articles`, newArticle)
      .then(() => setIsRefresh(true));
    setIsVisiblePost(false);
  };
  return (
    <div className="modalFormContainer">
      <div className="exitModal">
        <button
          className="exitButton"
          type="button"
          onClick={() => setIsVisiblePost(false)}
        >
          X
        </button>
      </div>
      <div className="modalPostForm">
        <h2 className="title">Nom du projet</h2>
        <input
          className="inputFormModal"
          type="text"
          value={title}
          placeholder="ex: Twitch c'est moi"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="title">Description</h2>
        <input
          className="inputFormModal"
          type="text"
          value={description}
          placeholder="ex: blablablba... !"
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="title">Contenu du Projet</h2>
        <textarea
          className="textArea"
          type="text"
          value={paraf}
          placeholder="ex: etc... "
          onChange={(e) => setParaf(e.target.value)}
        />
        <h2 className="title">Lien: </h2>
        <input
          className="inputFormModal"
          type="text"
          value={urlProject}
          placeholder="ex: Twitch c'est moi"
          onChange={(e) => setUrlProject(e.target.value)}
        />
        <h2 className="title">Technologies utilisées</h2>
        <div className="tidyPostLanguage">
          {techno.map((item, index) => (
            <div className="flexIcon">
              <input
                id={index}
                value={item}
                onChange={handleCheck}
                type="checkbox"
              />
              <p></p>
              <label htmlFor={index}>{item}</label>
            </div>
          ))}
        </div>
        <h2 className="title">Importer une image</h2>
        <label htmlFor="image">
          <input
            className="sendBtn"
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e)}
          />
        </label>
        <input
          className="sendBtn setUp"
          type="button"
          value="Envoyer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ModalPost;
