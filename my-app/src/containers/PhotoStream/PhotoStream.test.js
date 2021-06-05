jest.mock("node-fetch");
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");
import { findByTestAttr } from "../../testUtils/testUtils";
import PhotoStream from "./PhotoStream";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  const responseString =
    'jsonFlickrApi({"photos":{"page":1,"pages":200,"perpage":5,"total":1000,"photo":[{"id":"someId0","owner":"someOwner0","secret":"someSecret0","server":"someServer0","farm":66,"title":"someTitle0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId1","owner":"someOwner1","secret":"someSecret1","server":"someServer1","farm":66,"title":"someTitle1","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId2","owner":"someOwner2","secret":"someSecret2","server":"someServer2","farm":66,"title":"someTitle2","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId3","owner":"someOwner3","secret":"someSecret3","server":"someServer3","farm":66,"title":"someTitle3","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId4","owner":"someOwner4","secret":"someSecret4","server":"someServer4","farm":66,"title":"someTitle4","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"})';

  return fetch.mockReturnValue(Promise.resolve(new Response(responseString)));
});

const createPhotoStreamComponent = (expectedState) => {
  const wrapper = shallow(<PhotoStream />);
  return expectedState
    ? wrapper.setState(expectedState)
    : findByTestAttr(wrapper, "component-PhotoStream");
};

test("When app is loaded without errors, then PhotoStream is shown", () => {
  // act
  const photoStream = createPhotoStreamComponent();

  // assert
  expect(photoStream.length).toBe(1);
});

test("When app is loading, then Spinner is shown instead of PhotoStream", () => {
  // arrange
  const expectedState = {
    error: "",
    loading: true,
  };

  // act
  const wrapperPhotoStream = createPhotoStreamComponent(expectedState);
  const spinner = findByTestAttr(wrapperPhotoStream, "component-Spinner");
  const error = findByTestAttr(
    wrapperPhotoStream,
    "component-PhotoStreamError"
  );

  // assert
  expect(spinner.length).toBe(1);
  expect(error.length).toBe(0);
});

test("When app receives error message from api, then error is shown instead of PhotoStream", () => {
  // arrange
  const expectedState = {
    error: "this is error",
    loading: false,
  };

  // act
  const wrapperPhotoStream = createPhotoStreamComponent(expectedState);
  const spinner = findByTestAttr(wrapperPhotoStream, "component-Spinner");
  const error = findByTestAttr(
    wrapperPhotoStream,
    "component-PhotoStreamError"
  );

  // assert
  expect(spinner.length).toBe(0);
  expect(error.length).toBe(1);
});
