import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArenas, fetchCorners, fetchMatches } from "srcomp/srcompSlice";
import { useInterval } from "utils";

const numberOfPreviousMatchesToDisplay = 1;
const numberOfUpcomingMatchesToDisplay = 7;

const Staging = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  useInterval(() => {
    setCurrentTime(DateTime.now());
  }, 500);

  return (
    <div className="arena-side staging">
      <StagingTable currentTime={currentTime} />
      <footer>
        {currentTime.toLocaleString({
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </footer>
    </div>
  );
};

const StagingTable = ({ currentTime }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatches());
    dispatch(fetchArenas());
    dispatch(fetchCorners());
  }, [dispatch]);

  const { matchesToDisplay, currentMatchIndex } = useSelector((state) => {
    const matches = state.srcomp.matches;
    if (!matches || matches.length === 0) {
      return [];
    }
    const currentMatch = matches.findLast(
      (match) => DateTime.fromISO(match.times.staging.opens) <= currentTime
    );
    const currentMatchIndex = currentMatch ? matches.indexOf(currentMatch) : 0;
    const previousMatches = matches.slice(
      Math.max(0, currentMatchIndex - numberOfPreviousMatchesToDisplay),
      currentMatchIndex
    );
    const upcomingMatches = matches.slice(
      currentMatchIndex,
      currentMatchIndex + numberOfUpcomingMatchesToDisplay
    );

    const matchesToDisplay = [...previousMatches, ...upcomingMatches];
    return {
      matchesToDisplay,
      currentMatchIndex: matchesToDisplay.findIndex(
        (match) => match.num === currentMatch.num
      ),
    };
  });

  const arenas = useSelector((state) => Object.values(state.srcomp.arenas));
  const corners = useSelector((state) => Object.entries(state.srcomp.corners));

  return (
    <table>
      <thead>
        <tr>
          <th>Match</th>
          <th>Match Starts</th>
          <th>Staging Opens</th>
          {arenas?.map((arena) => (
            <th
              key={arena.name}
              style={{ backgroundColor: arena.colour }}
              colSpan={corners.length}
            >
              {arena.display_name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matchesToDisplay?.map((match, i) => (
          <Match
            key={match.num}
            isCurrentMatch={i === currentMatchIndex}
            match={match}
            arenas={arenas}
            corners={corners}
            currentTime={currentTime}
          />
        ))}
      </tbody>
    </table>
  );
};

const Match = ({ match, arenas, corners, currentTime, isCurrentMatch }) => {
  const stagingOpens = DateTime.fromISO(match.times.staging.opens);
  const stagingCloses = DateTime.fromISO(match.times.staging.closes);
  const gameStarts = DateTime.fromISO(match.times.game.start);

  const isStagingClosed = currentTime >= stagingCloses;
  const isStagingOpen = currentTime >= stagingOpens && !isStagingClosed;

  return (
    <tr className={isCurrentMatch ? "current-match" : null}>
      <td>{match.num}</td>
      <td>{gameStarts.toRelative()}</td>
      <td>
        {isStagingOpen
          ? "Open"
          : isStagingClosed
          ? "Closed"
          : stagingOpens.toRelative()}
      </td>
      {arenas?.map((arena) => {
        if (match.arena !== arena.name) return null;
        return corners?.map(([number, corner]) => {
          return (
            <td key={`${arena.name}-${number}`}>
              <span style={{ color: corner.colour }}>
                {match.teams[number] ?? "-"}
              </span>
            </td>
          );
        });
      })}
    </tr>
  );
};

export default Staging;
