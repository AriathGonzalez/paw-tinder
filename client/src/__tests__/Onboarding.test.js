import { BrowserRouter } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import renderer from "react-test-renderer";

describe("Onboarding Page", () => {
  describe("Snapshot Test", () => {
    it("Should render correctly", () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <Onboarding />
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
