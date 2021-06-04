export const saveInLocalStorage = (photoSrc) => {
    if (localStorage.getItem("favouritePhotos") !== null) {
      let favouritePhotos = localStorage.getItem("favouritePhotos").split(",");
      for (let i = 0; i < favouritePhotos.length; i++) {
        if (photoSrc === favouritePhotos[i]) {
          return;
        }
      }
      favouritePhotos.push(photoSrc);
      localStorage.setItem("favouritePhotos", favouritePhotos);
    } else {
      let favouritePhotos = [photoSrc];
      localStorage.setItem("favouritePhotos", favouritePhotos);
    }
  };