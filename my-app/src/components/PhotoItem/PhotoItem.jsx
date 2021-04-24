import React from "react";
import "./PhotoItem.scss";

const photoItem = (props) => {
  const photoSrc = `https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_w.jpg`;

  const saveInLocalStorage = () => {
    if (localStorage.getItem("favouritePhotos") !== null) {
      let favouritePhotos = localStorage.getItem("favouritePhotos").split(",");
      favouritePhotos.push(photoSrc);
      localStorage.setItem("favouritePhotos", favouritePhotos);
    } else {
      let favouritePhotos = [];
      favouritePhotos.push(photoSrc);
      localStorage.setItem("favouritePhotos", favouritePhotos);
    }
  };

  const calculateWidth = () => {
    const img = new Image();
    img.onload = function () {
      return this.width;
    };
  };

  return (
    <div className="photoItem">
      <div className="photoItem__hover">
        <p className="photoItem__hover__title">
          {props.title ? props.title : "No title"}
        </p>
        <p>{props.author ? props.author : "No author"}</p>
        <button onClick={() => saveInLocalStorage()}>Favourite</button>
      </div>
      <div className="photoItem__imgDiv">
        <img
          src={photoSrc}
          alt={props.title}
          width={calculateWidth()}
          heigh
        ></img>
      </div>
    </div>
  );
};

export default photoItem;
