import { DateTime } from "luxon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useInterval, secondsToHumanReadable } from "utils";
import { MatchSchedule, MatchScheduleMode } from "components";

const Staging = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  useInterval(() => {
    setCurrentTime(DateTime.now());
  }, 500);

  return (
    <div className="screen dark staging">
      <MatchSchedule
        currentTime={currentTime}
        numberOfPreviousMatchesToDisplay={1}
        numberOfUpcomingMatchesToDisplay={7}
        mode={MatchScheduleMode.Staging}
        columns={[
          { header: "Match", render: (match) => match.num },
          {
            header: "Match Starts",
            render: (match) =>
              DateTime.fromISO(match.times.game.start).toRelative(),
          },
          {
            header: "Staging Opens",
            render: (match) => {
              const stagingOpens = DateTime.fromISO(match.times.staging.opens);
              const stagingCloses = DateTime.fromISO(
                match.times.staging.closes
              );

              const isStagingClosed = currentTime >= stagingCloses;
              const isStagingOpen =
                currentTime >= stagingOpens && !isStagingClosed;

              return isStagingOpen
                ? "Open"
                : isStagingClosed
                ? "Closed"
                : stagingOpens.toRelative();
            },
          },
        ]}
      />
      <StagingFooter currentTime={currentTime} />
    </div>
  );
};

const StagingFooter = ({ currentTime }) => {
  const currentDelay = useSelector((state) => state.srcomp.currentDelay);
  return (
    <footer>
      <div>
        {currentTime.toLocaleString({
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </div>
      <div>
        Delay: {currentDelay ? secondsToHumanReadable(currentDelay) : "None"}
      </div>
    </footer>
  );
};

export default Staging;
