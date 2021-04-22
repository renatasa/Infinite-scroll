import React from "react";
import "./PhotoItem.scss";

const photoItem = (props) => {
  const photoSrc = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_w.jpg`;

  const saveInLocalStorage = () => {
    if (localStorage.getItem("favoritePhotos") !== null) {
      let favoritePhotos = localStorage.getItem("favoritePhotos").split(",");
      favoritePhotos.push(photoSrc);
      localStorage.setItem("favoritePhotos", favoritePhotos);
    } else {
      let favoritePhotos = [];
      favoritePhotos.push(photoSrc);
      localStorage.setItem("favoritePhotos", favoritePhotos);
    }
  };

  return (
    <div className="photoItem">
      <div className="photoItem__hover">
        {props.title}
        {props.author}
        <button onClick={() => saveInLocalStorage()}>Favorite</button>
      </div>
      <img
        className="photoItem__img"
        src={photoSrc}
        alt={props.title}
        width="300"
        height="200"
      ></img>
    </div>
  );
};

export default photoItem;
