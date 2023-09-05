import { useEffect, useLayoutEffect } from 'react'

import Router from './Router/Router'
import axios from 'axios';
import localStorageManager from './utils/localStorageManager';
import { useDispatch } from 'react-redux';
import { userSignIn, userSignOut } from './redux/slices/userSlice';
import Sockets from "./sockets/index"
import auth from './services/auth';
function App() {

  const dispatch = useDispatch();

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

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    let doc = await auth.verify()
    if (doc && doc.statusCode === 200) {
      dispatch(userSignIn(doc.data));
    } else {
      navigate("/");
      localStorage.clear();
      dispatch(userSignOut({}))
    }
  }


  return (
    <>
      <Sockets />
      <Router />
    </>
  )
}

export default App
