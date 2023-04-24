import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { GlobalContext } from "./storage/GlobalContext";

export default function Root() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    }
  ]);

  const globalContext = useContext(GlobalContext);

  return (
    <GlobalContext.Provider
      value={globalContext}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}
