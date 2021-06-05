import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../../testUtils/testUtils";
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

test("When createPhotoAttributesArray receives array with photoData from server, then modified array with photo urls, titles, owner information is returned", () => {
  // arrange
  const expectedInput = [
    {
      id: "someId0",
      owner: "someOwner0",
      secret: "someSecret0",
      server: "someServer0",
      title: "someTitle0",
    },
    {
      id: "someId1",
      owner: "someOwner1",
      secret: "someSecret1",
      server: "someServer1",
      title: "someTitle1",
    },
    {
      id: "someId2",
      owner: "someOwner2",
      secret: "someSecret2",
      server: "someServer2",
      title: "someTitle2",
    },
    {
      id: "someId3",
      owner: "someOwner3",
      secret: "someSecret3",
      server: "someServer3",
      title: "someTitle3",
    },
    {
      id: "someId4",
      owner: "someOwner4",
      secret: "someSecret4",
      server: "someServer4",
      title: "someTitle4",
    },
  ];

  const expectedOutput = [
    {
      title: "someTitle0",
      author: "someOwner0",
      url: "https://live.staticflickr.com/someServer0/someId0_someSecret0_w.jpg",
    },
    {
      title: "someTitle1",
      author: "someOwner1",
      url: "https://live.staticflickr.com/someServer1/someId1_someSecret1_w.jpg",
    },
    {
      title: "someTitle2",
      author: "someOwner2",
      url: "https://live.staticflickr.com/someServer2/someId2_someSecret2_w.jpg",
    },
    {
      title: "someTitle3",
      author: "someOwner3",
      url: "https://live.staticflickr.com/someServer3/someId3_someSecret3_w.jpg",
    },
    {
      title: "someTitle4",
      author: "someOwner4",
      url: "https://live.staticflickr.com/someServer4/someId4_someSecret4_w.jpg",
    },
  ];

  // act
  const actualOutput = createPhotoAttributesArray(expectedInput);

  // assert
  expect(expectedOutput).toEqual(actualOutput);
});