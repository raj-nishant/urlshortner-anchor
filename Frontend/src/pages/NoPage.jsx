import { useNavigate } from "react-router-dom"

const NoPage = () => {
  
    const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 bg-slate-400">

        <p
        className="font-semibold text-lg"
        >This page doesn&apos;t exist</p>

        <button
        onClick={() => navigate('/')}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >Home Page</button>

    </div>
  )
}

export default NoPage