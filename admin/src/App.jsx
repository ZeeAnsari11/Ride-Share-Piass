import { useLayoutEffect } from "react"
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Users from "./Pages/users/Users";
import Login from "./Pages/Login";
import axios from "axios"
import localStorageManager from "./utils/localStorageManager";
function App() {

  useLayoutEffect(() => {
    axios.interceptors.request.use(
      config => {
        const user = localStorageManager.getUser();
        if (user && user.token) {
          config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        return config;
      },
      error => {
        Promise.reject(error)
      }
    )
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Users />} />
          <Route path="*" element={<> Not Found </>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<> Not Found </>} />
      </Routes>
    </>
  );
}

export default App;
