const SECONDS_IN_A_YEAR = 31536000;
const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_MINUTE = 60;

const secondsToHumanReadable = (seconds) => {
  const levels = [
    [Math.floor(seconds / SECONDS_IN_A_YEAR), "years"],
    [Math.floor((seconds % SECONDS_IN_A_YEAR) / SECONDS_IN_A_DAY), "days"],
    [
      Math.floor(
        ((seconds % SECONDS_IN_A_YEAR) % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR
      ),
      "hours",
    ],
    [
      Math.floor(
        (((seconds % SECONDS_IN_A_YEAR) % SECONDS_IN_A_DAY) %
          SECONDS_IN_AN_HOUR) /
          SECONDS_IN_A_MINUTE
      ),
      "minutes",
    ],
    [
      (((seconds % SECONDS_IN_A_YEAR) % SECONDS_IN_A_DAY) %
        SECONDS_IN_AN_HOUR) %
        SECONDS_IN_A_MINUTE,
      "seconds",
    ],
  ];
  let humanReadable = "";

  levels.forEach((level) => {
    if (level[0] === 0) return;
    humanReadable +=
      " " +
      level[0] +
      " " +
      (level[0] === 1 ? level[1].substr(0, level[1].length - 1) : level[1]); // Remove the 's' from the end of the word if there is only one
  });

  return humanReadable.trim();
};

export default secondsToHumanReadable;
