jest.mock("node-fetch");
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");
import { loadPhotos } from "./flickrApi.js";

const inputParams = {
  startLoading: jest.fn(),
  updateStateWithPhotoData: jest.fn(),
  updateStateWithError: jest.fn(),
  photosPerPage: 2,
  currentPage: 0,
  increametCurrentPageOnFirstLoad: jest.fn(),
};

const mockRequest = (responseString) => {
  return {
    mockFetch: fetch.mockReturnValue(
      Promise.resolve(new Response(responseString))
    ),
    mockLoadPhotos: loadPhotos(
      inputParams.startLoading,
      inputParams.updateStateWithPhotoData,
      inputParams.updateStateWithError,
      inputParams.photosPerPage,
      inputParams.currentPage,
      inputParams.increametCurrentPageOnFirstLoad
    ),
  };
};

const mockFetch = (responseString) => {
  return fetch.mockReturnValue(Promise.resolve(new Response(responseString)));
};

const mockLoadPhotos = () => {
  return loadPhotos(
    inputParams.startLoading,
    inputParams.updateStateWithPhotoData,
    inputParams.updateStateWithError,
    inputParams.photosPerPage,
    inputParams.currentPage,
    inputParams.increametCurrentPageOnFirstLoad
  );
};

test("When user loads more photos and request is successful, then photo data is fetched from Flick api and saved in state", async () => {
  // arrange

  const responseString =
    'jsonFlickrApi({"photos":{"page":1,"pages":200,"perpage":5,"total":1000,"photo":[{"id":"someId0","owner":"someOwner0","secret":"someSecret0","server":"someServer0","farm":66,"title":"someTitle0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId1","owner":"someOwner1","secret":"someSecret1","server":"someServer1","farm":66,"title":"someTitle1","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId2","owner":"someOwner2","secret":"someSecret2","server":"someServer2","farm":66,"title":"someTitle2","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId3","owner":"someOwner3","secret":"someSecret3","server":"someServer3","farm":66,"title":"someTitle3","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId4","owner":"someOwner4","secret":"someSecret4","server":"someServer4","farm":66,"title":"someTitle4","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"})';

  const expectedPhotoData = [
    {
      author: "someOwner0",
      title: "someTitle0",
      url: "https://live.staticflickr.com/someServer0/someId0_someSecret0_w.jpg",
    },
    {
      author: "someOwner1",
      title: "someTitle1",
      url: "https://live.staticflickr.com/someServer1/someId1_someSecret1_w.jpg",
    },
    {
      author: "someOwner2",
      title: "someTitle2",
      url: "https://live.staticflickr.com/someServer2/someId2_someSecret2_w.jpg",
    },
    {
      author: "someOwner3",
      title: "someTitle3",
      url: "https://live.staticflickr.com/someServer3/someId3_someSecret3_w.jpg",
    },
    {
      author: "someOwner4",
      title: "someTitle4",
      url: "https://live.staticflickr.com/someServer4/someId4_someSecret4_w.jpg",
    },
  ];

  // act
  mockFetch(responseString);
  await mockLoadPhotos();

  // assert
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(inputParams.startLoading).toHaveBeenCalledTimes(1);
  expect(inputParams.updateStateWithPhotoData).toHaveBeenCalledTimes(1);
  expect(inputParams.updateStateWithPhotoData.mock.calls[0][0]).toEqual(
    expectedPhotoData
  );
  expect(inputParams.increametCurrentPageOnFirstLoad).toHaveBeenCalledTimes(1);
});

test("When user loads more photos and request is unsuccessful, then error data is fetched from Flick api and saved in state", async () => {
  // arrange
  const responseString =
    'jsonFlickrApi({"stat":"fail","code":100,"message":"Invalid API Key (Key has invalid format)"})';

  const expectedErrorMessage =
    "stat : fail  code : 100  message : Invalid API Key (Key has invalid format) ";

  // act
  mockFetch(responseString);
  await mockLoadPhotos();

  // assert
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(inputParams.startLoading).toHaveBeenCalledTimes(1);
  expect(inputParams.updateStateWithPhotoData).toHaveBeenCalledTimes(0);
  expect(inputParams.updateStateWithError).toHaveBeenCalledTimes(1);
  expect(inputParams.updateStateWithError.mock.calls[0][0]).toEqual(
    expectedErrorMessage
  );
  expect(inputParams.increametCurrentPageOnFirstLoad).toHaveBeenCalledTimes(0);
});
