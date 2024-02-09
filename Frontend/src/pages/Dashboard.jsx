/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GetShortURL from "../components/GetShortURL";
import InactiveAccount from "../components/InactiveAccount";
import AllShortURL from "../components/AllShortURL";
import { API } from "../helpers/API";
import ShortUrlCharts from "../components/ShortUrlCharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [inac, setInac] = useState(false);
  const [shortUrlData, setShortUrlData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user_token");
    navigate("/");
  }

  useEffect(() => {
    const sessionToken = localStorage.getItem("user_token");
    const URLShort = `${API}/s/all`;
    if (!sessionToken) {
      navigate("/");
      return;
    }
    fetch(URLShort, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.acknowledged) {
          setShortUrlData(data.data.reverse());
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-slate-600">
        <div className=" banter-loader">
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden overflow-y-auto">
      <div>
        <GetShortURL setInac={setInac} setShortUrlData={setShortUrlData} />
      </div>

      <button
        onClick={handleLogout}
        className="absolute px-2 py-1 text-white bg-blue-700 rounded-lg top-3 right-2 hover:contrast-200"
      >
        Logout
      </button>

      <div className="flex flex-col flex-wrap items-center justify-around w-4/5 px-8 py-4 mx-auto md:flex-row">
        <ShortUrlCharts shortUrlData={shortUrlData} />
      </div>

      <div className="mt-8">
        <AllShortURL shortUrlData={shortUrlData} />
      </div>

      {inac ? (
        <div className="fixed flex justify-center w-screen bg-transparent top-5">
          <InactiveAccount setInac={setInac} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
