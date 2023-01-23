import Arena from "./Arena";
import Home from "./Home";
import Staging from "./Staging";

export const Routes = [
  { path: "/", element: <Home /> },
  { path: "/arena", element: <Arena /> },
  { path: "/staging", element: <Staging /> },
];
