import { findByTestAttr } from "../../testUtils/testUtils";
import PhotoItem from "./PhotoItem";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

test("When PhotoItem receives correct props, then it renders without error", () => {
  // arrange
  const defaultProps = {
    author: "someOwner2",
    title: "someTitle2",
    url: "https://live.staticflickr.com/someServer2/someId2_someSecret2_w.jpg",
  };

  // act
  const wrapper = shallow(<PhotoItem {...defaultProps} />);
  const photoItemComponent = findByTestAttr(wrapper, "component-PhotoItem");

  // assert
  expect(photoItemComponent.length).toBe(1);
});
