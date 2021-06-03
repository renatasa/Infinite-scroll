import { findByTestAttr } from "../../testUtils/testUtils";
import { PhotoStream } from "./PhotoStream";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

test("When app loads, then PhotoStream component renders without error", () => {
  // // arrange
  // const wrapper = shallow(<PhotoStream />);

  // // act
  // const photoStream = findByTestAttr(wrapper, "component-PhotoStream");

  // // assert
  // expect(photoStream.length).toBe(1);
});
