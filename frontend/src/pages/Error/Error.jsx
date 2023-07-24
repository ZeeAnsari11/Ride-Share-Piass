import { Button, } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const naviagte = useNavigate();
  return (
        <div className='max-w-md mx-auto space-y-6'>

          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">OOPS</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl">404 - Page Not Found.</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">We are already working to solve the problem. </p>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => naviagte("/")}>
                Go to Home Page
              </button>
            </div>
          </div>
        </div>
  
  );
};

export default Error;
