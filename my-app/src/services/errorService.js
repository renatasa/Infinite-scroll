import React from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

export const createErrorMessage = (error, loading) => {
  if (error.length > 0 && !loading) {
    return <ErrorMessage error={error} errorType={"errorFetchingPhotos"} />;
  } else return null;
};
