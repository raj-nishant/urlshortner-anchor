/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GetNewPassword from "../components/GetNewPassword";
import { useParams } from "react-router-dom";
import { API } from "../helpers/API";

const NewPassword = () => {
  const { id, token } = useParams();
  const [response, setResponse] = useState("");

  const URL = `${API}/reset/${id}/${token}`;
  const updateURL = `${API}/reset/update/${id}/${token}`;

  // check if the token is valid
  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }, []);

  // update the new password
  function handelClick(userPassword) {
    fetch(updateURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPassword),
    })
      .then((data) => data.json())
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <GetNewPassword handelClick={handelClick} response={response} />
    </div>
  );
};

export default NewPassword;
