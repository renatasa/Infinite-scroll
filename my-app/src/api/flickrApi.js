import fetch from "node-fetch";
import { createPhotoAttributesArray } from "../containers/services/photoService";

export const getPhotosByPage = (startLoading, photosPerPage, currentPage) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_KEY}&per_page=${photosPerPage}&page=${currentPage}&format=json`;
  startLoading();
  return fetch(url).then((response) => {
    // throws error if server status response is not 200 (response.ok===false)
    if (!response.ok) {
      const error = {
        "Request status": response.status,
        data: "Request failed",
      };
      throw error;
    }
    return response.text();
  });
};

export const loadPhotos = (
  startLoading,
  updateStateWithPhotoData,
  updateStateWithError,
  photosPerPage,
  currentPage,
  increametCurrentPageOnFirstLoad
) => {
  return getPhotosByPage(startLoading, photosPerPage, currentPage)
    .then((text) => {
      const data = JSON.parse(text.match(/\((.*)\)/i)[1]);
      if (data.photos) {
        if (typeof increametCurrentPageOnFirstLoad !== "undefined") {
          increametCurrentPageOnFirstLoad();
        }
        return updateStateWithPhotoData(
          createPhotoAttributesArray(data.photos.photo)
        );
      }
      // throws error is server status response is 200 (response.ok===true), but request failed
      if (data.stat === "fail") {
        throw data;
      }
    })
    .catch((errorResponse) => {
      if (errorResponse.stat === "fail") {
        const error = Object.keys(errorResponse)
          .map(
            (response, key) =>
              `${response}` +
              " : " +
              `${Object.values(errorResponse)[key]}` +
              " "
          )
          .join(" ");
        return updateStateWithError(error);
      } else {
        // throws error if request was not sent to the server, no server response
        return updateStateWithError(
          "Request not sent, please check your url address and network connection!"
        );
      }
    });
};
