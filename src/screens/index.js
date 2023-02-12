import Arena from "./Arena";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import CompetitorSchedule from "./CompetitorSchedule";
import Staging from "./Staging";

export const Routes = [
  { path: "/", element: <Home /> },
  { path: "/arena", element: <Arena /> },
  { path: "/staging", element: <Staging /> },
  { path: "/leaderboard", element: <Leaderboard /> },
  { path: "/competitor-schedule", element: <CompetitorSchedule /> },
];
