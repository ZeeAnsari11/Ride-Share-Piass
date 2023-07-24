import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux';
import Router from './Router/Router'
import localStorageManager from './utils/localStorageManager';
import { userSignIn } from './redux/slices/userSlice';
import './App.css'
import axios from 'axios';
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
      <Router />
    </>
  )
}

export default App
