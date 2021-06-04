import { findByTestAttr } from "../../testUtils/testUtils";
import ErrorMessage from "./ErrorMessage";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

test("When ErrorMessage receives correct props, then it renders without error", () => {
  // arrange
  const defaultProps = {
    errorType: "errorFetchingPhotos",
    error: "error occured",
  };

  // act
  const wrapper = shallow(<ErrorMessage {...defaultProps} />);
  const errorMessageComponent = findByTestAttr(
    wrapper,
    "component-ErrorMessage"
  );

  // assert
  expect(errorMessageComponent.length).toBe(1);
});
