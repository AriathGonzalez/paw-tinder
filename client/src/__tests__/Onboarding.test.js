import Onboarding from "../pages/Onboarding";
import renderer from "react-test-renderer";

describe("Onboarding Page", () => {
  describe("Snapshot Test", () => {
    it("Should render correctly", () => {
      const tree = renderer.create(<Onboarding />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
