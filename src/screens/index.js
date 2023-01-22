import Arena from "./Arena";
import Home from "./Home";
import Shepherding from "./Shepherding";

export const Routes = [
  { path: "/", element: <Home /> },
  { path: "/arena", element: <Arena /> },
  { path: "/shepherding", element: <Shepherding /> },
];
