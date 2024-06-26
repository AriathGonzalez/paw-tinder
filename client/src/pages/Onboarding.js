import { useState } from "react";
import Nav from "../components/Nav";
import "../styles/Onboarding.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Onboarding = () => {
  const [cookies, ,] = useCookies(["user"]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5000/users/", {
        formData,
      });
      const success = response.status === 200;

      if (success) navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        setIsSignUp={() => {}}
      />
      <div className="onboarding">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required
                value={formData.dob_day}
                onChange={handleChange}
                min="1"
                max="31"
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required
                value={formData.dob_month}
                onChange={handleChange}
                min="1"
                max="12"
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man_gender_identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man_gender_identity">Good Boy</label>

              <input
                id="woman_gender_identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman_gender_identity">Sweet Girl</label>

              <input
                id="more_gender_identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more_gender_identity">More</label>
            </div>
            <label htmlFor="show_gender">Show gender on my profile</label>
            <input
              id="show_gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man_gender_interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man_gender_interest">Good Boy</label>
              <input
                id="woman_gender_interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman_gender_interest">Sweet Girl</label>
              <input
                id="everyone_gender_interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone_gender_interest">Everyone</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required
              placeholder="I love playing fetch..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="about">Profile</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required
            />

            <div className="photo-container">
              {formData.url && <img src={formData.url} alt="Profile" />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
