import { MatchSchedule } from "components";
import { DateTime } from "luxon";
import { useState } from "react";
import useInterval from "utils/useInterval";

const Schedule = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  useInterval(() => {
    setCurrentTime(DateTime.now());
  }, 500);

  return (
    <div className="screen dark competitor-schedule">
      <h1>Schedule</h1>
      <MatchSchedule
        currentTime={currentTime}
        numberOfPreviousMatchesToDisplay={1}
        numberOfUpcomingMatchesToDisplay={7}
        columns={[
          { header: "Match", render: (match) => match.num },
          {
            header: "Match Starts",
            render: (match) =>
              DateTime.fromISO(match.times.game.start).toRelative(),
          },
        ]}
      />
    </div>
  );
};

export default Schedule;
