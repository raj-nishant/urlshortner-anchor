import { useState } from "react";
import GetEmail from "../components/GetEmail";
import { API, AppLink } from "../helpers/API";

const Forgot = () => {
  const [response, setResponse] = useState("");
  // URL for validate the email
  const URL = `${API}/forgot`;

  function handleClick(user) {
    if (!user.email) {
      setResponse({ error: "Fields are required" });
      return;
    }

    // React URL for new password update
    const mailUser = {
      email: user.email,
      link: `${AppLink}/reset`,
    };

    // validate email and send email
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailUser),
    })
      .then((data) => data.json())
      .then((data) => setResponse(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <GetEmail
        handleClick={handleClick}
        response={response}
        setResponse={setResponse}
      />
    </div>
  );
};

export default Forgot;
