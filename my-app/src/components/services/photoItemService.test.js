import {saveInLocalStorage} from "./photoItemService";

test("When saveInLocalStorage receives new photo url, then if that url wasn't saved already, it is being saved in localStorage", () => {
    // arrange
    const actualNewPhotoUrl = "newPhotoUrl";
  
    // act
    saveInLocalStorage(actualNewPhotoUrl);
    const expectedFavouritePhotosArr=localStorage.getItem("favouritePhotos").split(",");
  
    // assert
    expect(expectedFavouritePhotosArr[expectedFavouritePhotosArr.length-1]).toBe(actualNewPhotoUrl);
  });