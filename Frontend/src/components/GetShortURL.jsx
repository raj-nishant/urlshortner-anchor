/* eslint-disable react/prop-types */
import { useState } from "react"
import { API } from "../helpers/API";

const GetShortURL = ({setInac, setShortUrlData}) => {

    const [url, setUrl] = useState('');
    const [err, setErr] = useState('');
    const [mes, setMes] = useState('');
    
    const URL = `${API}/shorturl/create` ;
    const sessionToken = localStorage.getItem('user_token');

    function handleChange(e){
        setUrl(e.target.value);
        setErr('');
    }

    function handleClick(){
        if(!url){
            setErr('Field are Required');
            return
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullURL: url,
                sessionToken
            })
        })
        .then((data) => data.json())
        .then((data) => {
            if(data.acknowledged){
                setErr('');
                setMes(data.message);
                setShortUrlData((prev) => ([data.newURL, ...prev]) );
            }else{
                if(data.inactive){
                    setInac(true)
                }
                setErr(data.error);
                setMes('');
            }
        })
        .catch((err) => console.log(err))
    }

  return (
    <div className="flex flex-col items-center justify-center w-screen gap-2 text-center">
        <div className="w-60 sm:w-96">
            <label htmlFor="fullURL" className="block mb-2 text-sm font-medium dark:text-white">Search</label>

            <div className="flex rounded-lg shadow-sm">

                <input type="url"
                className="block w-full px-4 py-3 text-sm border border-gray-800 shadow-sm bg-slate-100 rounded-s-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                placeholder="Enter the link here" 
                name="fullURL"
                value={url}
                onChange={(e) => handleChange(e)}
                />

                <button type="button" 
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent whitespace-nowrap gap-x-2 rounded-e-md hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={() => handleClick()}
                 >
                    Shorten URL
                </button>
            </div>
        </div>

        {
            err ? <p className="text-xs text-red-500 " >{err}</p> : 
            mes? <p className="text-xs text-green-500 " >{mes}</p> : '' 
        }
        
    </div>
  )
}

export default GetShortURL