import React, { Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
const PhotoItem = React.lazy(() => import("../../components/PhotoItem/PhotoItem"));

export const createPhotoStream = (photoAttributesArray) => {
  if (photoAttributesArray.length > 0) {
    return photoAttributesArray.map((photo, key) => (
      <Suspense fallback={<Spinner />} data-test="component-Suspense" key={key}>
        <PhotoItem
          url={photo.url}
          title={photo.title}
          author={photo.author}
          key={key}
        />
      </Suspense>
    ));
  } else return [];
};

export const createPhotoAttributesArray = (photoData) => {
  let photoAttributesArr = [];
  photoAttributesArr = photoData.map((item) => {
    const photoObj = {};
    photoObj.title = item.title;
    photoObj.author = item.owner;
    photoObj.url = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`;
    return photoObj;
  });

  return photoAttributesArr;
};
