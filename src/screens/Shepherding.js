import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "srcomp/srcompSlice";
import { useInterval } from "utils";

const numberOfPreviousMatchesToDisplay = 1;
const numberOfUpcomingMatchesToDisplay = 7;

const Shepherding = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  useInterval(() => {
    setCurrentTime(DateTime.now());
  }, 500);

  return (
    <React.Fragment>
      <div className="home">Shepherding @ {currentTime.toISO()}</div>
      <ShepherdingTable currentTime={currentTime} />
    </React.Fragment>
  );
};

const ShepherdingTable = ({ currentTime }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const matchesToDisplay = useSelector((state) => {
    const matches = state.srcomp.matches;
    if (!matches || matches.length === 0) {
      return [];
    }
    const currentMatch = matches.findLast(
      (match) => DateTime.fromISO(match.times.slot.start) <= currentTime
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
    return [...previousMatches, ...upcomingMatches];
  });

  return (
    <React.Fragment>
      <div>
        {matchesToDisplay?.map((match) => (
          <Match key={match.num} match={match} />
        ))}
      </div>
    </React.Fragment>
  );
};

const Match = ({ match }) => {
  return (
    <div>
      <h2>Match {match.num}</h2>
      <p>Starting: {DateTime.fromISO(match.times.slot.start).toRelative()}</p>
    </div>
  );
};

export default Shepherding;
