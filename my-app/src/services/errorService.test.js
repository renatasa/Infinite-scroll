import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../testUtils/testUtils";

import { createErrorMessage } from "./errorService";

Enzyme.configure({ adapter: new Adapter() });

describe("Test createErrorMessage function", () => {
  // arrange
  const inputParams = {
    errorExist: "there is error",
    noError: "",
    loadingTrue: true,
    loadingFalse: false,
  };

  test("When createErrorMessage receives error, then <ErrorMessage/> is returned", () => {
    // arrange
    const expectedOutput = createErrorMessage(
      inputParams.errorExist,
      inputParams.loadingFalse
    );
    const wrapper = shallow(expectedOutput);

    // act
    const errorMessage = findByTestAttr(wrapper, "component-ErrorMessage");

    // assert
    expect(errorMessage.length).toBe(1);
  });

  test("When createErrorMessage does not receive error or loading is true, then null is returned", () => {
    // act
    const errorMessage = createErrorMessage(
      inputParams.noError,
      inputParams.loadingTrue
    );

    // assert
    expect(errorMessage).toEqual(null);
  });
});
