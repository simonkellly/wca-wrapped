import ErrorPage from "./error-page";
import Root from "./pages/root";
import Wrapped from "./pages/wrapped";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "wrapped",
        element: <Wrapped />,
      },
    ],
  },
]);

function App() {

  return (
    <>
      <script src="https://cdn.cubing.net/js/cubing/twisty" type="module"></script>
      <RouterProvider router={router} />
    </>

  )
}

export default App
