import axios from "axios";
import { useEffect, useState } from "react";

const MatchesDisplay = ({ matches }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      console.log("getting matches: ", matches);
      const response = await axios.get(
        "http://localhost:5000/users/matched_users",
        {
          params: { userIds: JSON.stringify(matchedUserIds) },
        }
      );
      console.log("response: ", response);
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match, _index) => (
        <div key={_index} className="match-card">
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
