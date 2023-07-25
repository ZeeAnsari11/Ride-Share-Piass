import { useEffect, useLayoutEffect } from 'react'

import Router from './Router/Router'
import axios from 'axios';
import localStorageManager from './utils/localStorageManager';
import { useDispatch } from 'react-redux';
import { userSignIn } from './redux/slices/userSlice';
import Sockets from "./sockets/index"
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
    let user = localStorageManager.getUser();
    if (user) {
      dispatch(userSignIn(user));
    }
  }, []);


  return (
    <>
      <Sockets />
      <Router />
    </>
  )
}

export default App
