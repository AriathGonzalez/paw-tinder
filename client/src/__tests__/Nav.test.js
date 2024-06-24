import Nav from "../components/Nav";
import renderer from "react-test-renderer";

describe("Nav Component", () => {
  describe("Snapshot Test", () => {
    it("Should render correctly", () => {
      const tree = renderer
        .create(
          <Nav
            minimal={false}
            showModal={false}
            setShowModal={null}
            setIsSignUp={null}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
