import React from "react";
import "./ErrorMessage.scss";

export const errorMessage = (props) => {
  switch (props.errorType) {
    case "errorFetchingPhotos":
      return <div className="photosNotFetched">{props.error}</div>;

    case "errorAddingFavoritePhoto":
      return <div>Could not add favorite photo</div>;

    default:
      break;
  }
};

export default errorMessage;
