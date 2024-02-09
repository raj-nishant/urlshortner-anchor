/* eslint-disable react/prop-types */

import { useState } from "react"

const GetNewPassword = ({handelClick, response}) => {

  const [userPassword, setUserPassword] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  // update states
  function handleChange(e){
    setUserPassword((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  return (
    <>
      {
        !response.acknowledged ? (
          <div className="font-bold text-lg">
            {response.error}
          </div>
        ) :
        (
          <div className="flex flex-col gap-3 m-auto justify-center items-center px-3 sm:px-5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-neutral-200 pt-3 pb-5">

              <p className="font-bold text-lg" >
                Reset Password
              </p>
      
              <div className="w-60 sm:w-72">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[5.8px] border-blue-gray-200 focus:border-gray-900 placeholder-shown:border-blue-950"
                    placeholder=" " 
                    name="newPassword"
                    value={userPassword.newPassword}
                    onChange={(e) => handleChange(e)}
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">New Password
                  </label>
                </div>
              </div> 
      
              <div className="w-60 sm:w-72">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[5.8px] border-blue-gray-200 focus:border-gray-900 placeholder-shown:border-blue-950"
                    placeholder=" " 
                    name="confirmNewPassword"
                    value={userPassword.confirmNewPassword}
                    onChange={(e) => handleChange(e)}
                    /><label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Confirm New Password
                  </label>
                </div>
              </div> 
              {
                userPassword.newPassword !== userPassword.confirmNewPassword ? (
                  <div className=" text-sm text-red-500">Password does not match</div>
                ) :
                ''
              }

              {
                (response.acknowledged && response.message) ? (
                  <div className=" text-sm text-green-500">{response.message}</div>
                ) :
                ''
              }

              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handelClick(userPassword)}
              >
                Update Password
              </button>
          </div>
        )
      }
    </>

  )
}

export default GetNewPassword