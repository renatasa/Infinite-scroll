import React from "react";
import "./ErrorMessage.scss";

export const errorMessage = (props) => {

  switch (props.errorType) {
    case "errorFetchingPhotos":
      return <div className="photosNotFetched" data-test="component-ErrorMessage">{props.error}</div>;
    default:
      break;
  }
};

export default errorMessage;
