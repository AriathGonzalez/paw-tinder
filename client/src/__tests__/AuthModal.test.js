import AuthModal from "../components/AuthModal";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

describe("AuthModel Component", () => {
  describe("Snapshot Test", () => {
    it("Should render correctly", () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <AuthModal setShowModal={null} isSignUp={true} setIsSignUp={null} />
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
