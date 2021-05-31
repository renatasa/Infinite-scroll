import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../testUtils/testUtils";
import { createPhotoStream, createPhotoAttributesArray } from "./photoService";

Enzyme.configure({ adapter: new Adapter() });

describe("Test createPhotoStream function", () => {
  // arrange
  const photoAttributesArray = [
    { url: "http://someUrl0", title: "someTitle0", author: "someAuthor0" },
    { url: "http://someUrl1", title: "someTitle1", author: "someAuthor1" },
    { url: "http://someUrl2", title: "someTitle2", author: "someAuthor2" },
  ];

  const emptyArray = [];

  test("When createPhotoStream receives array with photo data, then array of photos is returned", () => {
    // arrange
    const expectedOutput = createPhotoStream(photoAttributesArray);
    const wrapper = shallow(expectedOutput[0]);

    // act
    const photoItem = findByTestAttr(wrapper, "component-Suspense");

    // assert
    expect(photoItem.length).toBe(1);
    expect(expectedOutput.length).toBe(photoAttributesArray.length);
  });

  test("When createPhotoStream does not receive array with photo data, then empty array is returned", () => {
    // act
    const expectedOutput = createPhotoStream(emptyArray);

    // assert
    expect(expectedOutput).toEqual(emptyArray);
  });
});
