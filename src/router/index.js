import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "../pages/PrivateRoute";
import Messages from "../pages/Messages";
import Notifications from "../pages/Notifications";
import GetPost from "../pages/GetPost";
import NotifyMessages from "../pages/NotifyMessages";
import CreateProfile from "../pages/CreateProfile";
import AddEducation from "../pages/AddEducation";
import AddExperience from "../pages/AddExperience";
import ChangePassword from "../pages/ChangePassword";
// import VideoCall from "../pages/VideoCall";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:user/:id",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/create",
    element: (
      <PrivateRoute>
        <CreateProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/education/create",
    element: (
      <PrivateRoute>
        <AddEducation />
      </PrivateRoute>
    ),
  },
  {
    path: "/experience/create",
    element: (
      <PrivateRoute>
        <AddExperience />
      </PrivateRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <PrivateRoute>
        <Notifications />
        <div>Hello</div>
      </PrivateRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <PrivateRoute>
        <NotifyMessages />
      </PrivateRoute>
    ),
  },
  {
    path: "/message/:user/:id",
    element: (
      <PrivateRoute>
        <Messages />
      </PrivateRoute>
    ),
  },

  {
    path: "/post/:id",
    element: (
      <PrivateRoute>
        <GetPost />{" "}
      </PrivateRoute>
    ),
  },

  {
    path: "/change-password",
    element: (
      <PrivateRoute>
        <ChangePassword />
      </PrivateRoute>
    ),
  },
]);
