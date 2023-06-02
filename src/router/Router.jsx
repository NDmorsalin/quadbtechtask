import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home/Home";
import fetchSinglePlace from "../utility/fetchData/fetchSinglePlace";
import Details from "../pages/Details/Details";
import Theatre from "../pages/Theatre/Theater";
import Booked from "../pages/Booked/Booked";
import fetchBookedMovies from "../utility/fetchData/fetchBookedMovies";
import AllMovies from "../pages/AllMovies/AllMovies";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allmovies",
        element: <AllMovies />,
      },
      {
        path: "/theatre/:id",
        element: <Theatre />,
        loader: fetchSinglePlace,
      },
      {
        path: "details/:id",
        element: <Details />,
        loader: fetchSinglePlace,
      },
      {
        path:'booked',
        element:<Booked/>,
        loader:fetchBookedMovies,
      }
    ],
  },
]);

export default router;
