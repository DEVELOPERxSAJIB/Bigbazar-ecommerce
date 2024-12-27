import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUserInfo } from "./features/auth/authApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedInUserInfo());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
