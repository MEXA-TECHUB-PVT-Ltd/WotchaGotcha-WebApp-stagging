import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Router from "./router/Router";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import AuthNavigator from "./navigation/auth";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserProfileData } from "./app/features/user";
import { Spinner } from "./components/theme/Loader";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const { token } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      setIsLoading(true);
      const decodeToken = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodeToken.exp < currentTime) {
        handleLogOut();
      }

      const userId = decodeToken.userId;

      await dispatch(getUserProfileData({ userId, token })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getUserDetails();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className={`${theme.mode === "dark" && "dark"}`}>
        {" "}
        <Spinner size="xl" className="h-[100vh]" />
      </div>
    );
  }

  return (
    <div
      className={`full ${
        theme.mode === "dark" && "dark"
      }  dark:bg-dark_bg_4 bg-white dark:text-dark_text_1`}
    >
      {token ? (
        <>
          <Sidebar />
          <div className={`routes-container ${!theme.isSideBarOpen && "w-full"}`}>
            <Navbar />
            <div className="main-content">
              <Router />
            </div>
          </div>
        </>
      ) : (
        <AuthNavigator />
      )}
    </div>
  );
}

export default App;
