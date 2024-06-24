import Home from "../pages/Home";
import renderer from "react-test-renderer";

describe("Home Page", () => {
  describe("Snapshot Test", () => {
    it("Should render correctly", () => {
      const tree = renderer.create(<Home />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
