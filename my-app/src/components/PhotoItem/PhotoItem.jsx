import React from "react";
import PropTypes from "prop-types";
import "./PhotoItem.scss";

const photoItem = (props) => {
  const photoSrc = props.url;
  const saveInLocalStorage = () => {
    if (localStorage.getItem("favouritePhotos") !== null) {
      let favouritePhotos = localStorage.getItem("favouritePhotos").split(",");
      for (let i = 0; i < favouritePhotos.length; i++) {
        if (photoSrc == favouritePhotos[i]) {
          return;
        }
      }
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
    img.onload = () => {
      return this.width;
    };
  };

  const preferableTitleLength = 12;
  const title =
    props.title.length > preferableTitleLength
      ? props.title.slice(0, preferableTitleLength - 1)
      : props.title;

  return (
    <div className="photoItem">
      <div className="photoItem__hover">
        <p className="photoItem__hover__title">
          {props.title ? title : "No title"}
        </p>
        <div className="photoItem__hover__underline photoItem__hover-color--light" />
        <p className="photoItem__hover__author photoItem__hover-color--light">
          {props.author ? props.author : "No author"}
        </p>
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

photoItem.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default photoItem;
