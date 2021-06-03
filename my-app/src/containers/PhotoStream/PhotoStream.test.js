jest.mock("node-fetch");
import fetch from "node-fetch";
const { Response } = jest.requireActual("node-fetch");
import { findByTestAttr } from "../../testUtils/testUtils";
import { PhotoStream } from "./PhotoStream";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

test("When app loads, then PhotoStream component renders without error", () => {
  // arrange
  const responseString =
    'jsonFlickrApi({"photos":{"page":1,"pages":200,"perpage":5,"total":1000,"photo":[{"id":"someId0","owner":"someOwner0","secret":"someSecret0","server":"someServer0","farm":66,"title":"someTitle0","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId1","owner":"someOwner1","secret":"someSecret1","server":"someServer1","farm":66,"title":"someTitle1","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId2","owner":"someOwner2","secret":"someSecret2","server":"someServer2","farm":66,"title":"someTitle2","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId3","owner":"someOwner3","secret":"someSecret3","server":"someServer3","farm":66,"title":"someTitle3","ispublic":1,"isfriend":0,"isfamily":0},{"id":"someId4","owner":"someOwner4","secret":"someSecret4","server":"someServer4","farm":66,"title":"someTitle4","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"})';

  fetch.mockReturnValue(Promise.resolve(new Response(responseString)))
  const wrapper = shallow(<PhotoStream />);

  // act
  const photoStream = findByTestAttr(wrapper, "component-PhotoStream");

  // assert
  expect(photoStream.length).toBe(1);
});
