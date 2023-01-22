import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateTeamData,
  setLastScoredMatch,
  setCurrentDelay,
  setKnockouts,
} from "./srcompSlice";

const SrcompStreamConsumer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/stream");

    sse.addEventListener("team", (event) => {
      dispatch(updateTeamData(event.data));
    });

    sse.addEventListener("last-scored-match", (event) => {
      dispatch(setLastScoredMatch(event.data));
    });

    sse.addEventListener("current-delay", (event) => {
      dispatch(setCurrentDelay(event.data));
    });

    sse.addEventListener("knockouts", (event) => {
      dispatch(setKnockouts(event.data));
    });

    sse.onerror = (event) => {
      console.error(event);
      sse.close();
      //TODO: Reconnect
    };

    return () => {
      sse.close();
    };
  }, [dispatch]);
};

export default SrcompStreamConsumer;
