import { DateTime } from "luxon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArenas, fetchCorners, fetchMatches } from "srcomp/srcompSlice";

const getMatchClassName = (match) => {
  if (match.times.game.end < DateTime.local().toISO()) {
    return "old-match";
  } else if (match.times.game.start > DateTime.local().toISO()) {
    return "future-match";
  }
  return "current-match";
};

const MatchSchedule = ({
  currentTime,
  numberOfPreviousMatchesToDisplay,
  numberOfUpcomingMatchesToDisplay,
  columns,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load data on first render
    dispatch(fetchMatches());
    dispatch(fetchArenas());
    dispatch(fetchCorners());
  }, [dispatch]);

  const matchesToDisplay = useSelector((state) => {
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
    return matchesToDisplay;
  });

  const arenas = useSelector((state) => Object.values(state.srcomp.arenas));
  const corners = useSelector((state) => Object.entries(state.srcomp.corners));

  return (
    <table className="match-schedule">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
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
        {matchesToDisplay?.map((match) => (
          <tr key={match.num} className={getMatchClassName(match)}>
            {columns.map((column) => (
              <td key={`${match.num}-${column.header}`}>
                {column.render(match)}
              </td>
            ))}
            {arenas?.map((arena) => {
              if (match.arena !== arena.name) return null;
              return corners?.map(([number, corner]) => {
                return (
                  <td key={`${arena.name}-${number}`}>
                    <span style={{ color: corner.colour }}>
                      {match.teams[number] ?? "—"}
                    </span>
                  </td>
                );
              });
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchSchedule;
