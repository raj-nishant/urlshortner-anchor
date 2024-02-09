/* eslint-disable react/prop-types */
import { useState } from "react";
import { API } from "../helpers/API"

const InactiveAccount = ({setInac}) => {
    
    const [err, setErr] = useState('');
    const [mes, setMes] = useState('');

    const URL = `${API}/signup/resend`
    const sesToken = localStorage.getItem('user_token');

    function handleClick(){
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionToken: sesToken
            })
        })
        .then((data) => data.json())
        .then((data) => {
            
            if(data.acknowledged){
                setErr('');
                setMes(data.message);
            }else{
                setErr(data.error);
                setMes('');
            }
        })
        .catch((err) => console.log(err))
    }

  return (
    <div className="flex flex-col items-center w-4/5 gap-5 px-2 py-5 sm:w-2/4 bg-slate-200">
            
        <p>your email address is not verified</p>
        <p>The verification email was send to your email address during Registration</p>
        <p>Please verify your email to proceed further</p>
        
        <div className="flex flex-row items-center justify-center w-full text-center">
            <div className="flex-grow h-px bg-gray-400"></div>
            <div className="mx-2 text-sm">OR</div>
            <div className="flex-grow h-px bg-gray-400"></div>
        </div>
        
        <p>Can&apos;t find the email? click below to resend it</p>

        <div>
        <button type="button" 
        className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
            setMes('Sending email ....');
            handleClick();
        }}
        >
            Resend Email
        </button>
        <button type="button" 
        className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => setInac(false)}
        >
            Cancel
        </button>
        </div>

        {
            err ? <p className="text-xs text-red-500 " >{err}</p> : 
            mes? <p className="text-xs text-green-800 " >{mes}</p> : '' 
        }

    </div>
  )
}

export default InactiveAccount