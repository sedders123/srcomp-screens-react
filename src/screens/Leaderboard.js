import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "srcomp/srcompSlice";

const teamsToDisplay = 10;

const Leaderboard = () => {
  const lastScoredMatch = useSelector((state) => state.srcomp.lastScoredMatch);

  return (
    <div className="screen public-facing leaderboard">
      <h1>Leaderboard</h1>
      <LeaderboardTable />
      {lastScoredMatch && (
        <div className="last-scored">
          Up to date with scores from match {lastScoredMatch}
        </div>
      )}
    </div>
  );
};

const LeaderboardTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load data on first render
    dispatch(fetchTeams());
  }, [dispatch]);

  const leaderboard = useSelector((state) => {
    const teams = Object.values(state.srcomp.teams);
    if (!teams || teams.length === 0) {
      return [];
    }
    teams.sort((a, b) => {
      const diff = a.league_pos - b.league_pos;
      if (diff === 0) {
        // Sort by TLA if league position is the same
        return a.tla.localeCompare(b.tla);
      }
      return diff;
    });
    return teams.slice(0, teamsToDisplay);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>League Points</th>
          <th>Game Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((team) => (
          <tr key={team.tla}>
            <td>{team.tla}</td>
            <td>{team.scores.league}</td>
            <td>{team.scores.game}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Leaderboard;
