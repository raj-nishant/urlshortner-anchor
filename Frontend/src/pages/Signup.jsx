import { useState } from "react";
import FrontComponent from "../components/FrontComponent";
import { API } from "../helpers/API";

const Signup = () => {
  const [response, setResponse] = useState("");
  const URL = `${API}/signup/newuser`;

  const pgHeading = "Signup";

  async function handleClick(user) {
    // check if there is empty data
    if (!user.email || !user.password || !user.first_name || !user.last_name) {
      setResponse({ error: "Fields are required" });
      return;
    }
    console.log(user);

    // update the user data in DB
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.error) setResponse(() => data);
        if (data.message) setResponse({ message: data.message });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <FrontComponent
        pgHeading={pgHeading}
        handleClick={handleClick}
        response={response}
        setResponse={setResponse}
      />
    </div>
  );
};

export default Signup;
