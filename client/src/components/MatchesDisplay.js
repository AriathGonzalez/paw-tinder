import axios from "axios";
import { useEffect, useState, useCallback } from "react";
// import { useCookies } from "react-cookie";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  // const [cookies, ,] = useCookies(null);
  // const userId = cookies.UserId;

  // const filteredMatchedProfiles = matchedProfiles?.filter(
  //   (matchedProfile) =>
  //     matchedProfile.matches.filter((profile) => profile.user_id == userId)
  //       .length > 0
  // );

  const getMatches = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/matched_users",
        {
          params: { userIds: JSON.stringify(matchedUserIds) },
        }
      );
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [matchedUserIds]);

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match) => (
        <div
          key={match.user_id}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={"Profile" + match?.first_name} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
