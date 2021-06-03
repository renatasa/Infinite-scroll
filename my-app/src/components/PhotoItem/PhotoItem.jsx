import React from "react";
import PropTypes from "prop-types";
import {saveInLocalStorage} from "../services/photoItemService";
import "./PhotoItem.scss";

export const photoItem = (props) => {

  const photoSrc = props.url;

  const preferableTitleLength = 12;
  const title =
    props.title.length > preferableTitleLength
      ? props.title.slice(0, preferableTitleLength - 1)
      : props.title;

  return (
    <div className="photoItem" data-test="component-PhotoItem">
      <div className="photoItem__hover">
        <p className="photoItem__hover__title">
          {props.title ? title : "No title"}
        </p>
        <div className="photoItem__hover__underline photoItem__hover-color--light" />
        <p className="photoItem__hover__author photoItem__hover-color--light">
          {props.author ? props.author : "No author"}
        </p>
        <button onClick={() => saveInLocalStorage(photoSrc)}>Favourite</button>
      </div>
      <div className="photoItem__imgDiv">
        <img src={photoSrc} alt={props.title}></img>
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