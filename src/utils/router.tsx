import { createBrowserRouter, defer } from "react-router-dom";
import Root from "../routes/root";
import Users from "../routes/users";
import Home from "../routes/home";
import { getUsers } from "./queries/getUsers";
import UserInfo from "../routes/user-info";
import Error from "../routes/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/users",
        element: <Users />,
        // Currently by default these data will not be cached
        // If we want to add some cache functionality in the furure
        // We can use react-query, useSwr or even move our project to Next.js
        loader: () => defer({ users: getUsers({}) }),
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user-info/:username",
        element: <UserInfo />
      }
    ],
  },
]);
