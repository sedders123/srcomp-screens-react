import Arena from "./Arena";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Staging from "./Staging";

export const Routes = [
  { path: "/", element: <Home /> },
  { path: "/arena", element: <Arena /> },
  { path: "/staging", element: <Staging /> },
  { path: "/leaderboard", element: <Leaderboard /> },
];
