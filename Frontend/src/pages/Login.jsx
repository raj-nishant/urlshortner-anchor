import { useEffect, useState } from "react";
import FrontComponent from "../components/FrontComponent";
import { API } from "../helpers/API";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const pgHeading = "Login";
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const URL = `${API}/login/user`;

  async function handleClick(user) {
    // check for empty data
    if (!user.email || !user.password) {
      setResponse({ error: "Fields are required" });
      return;
    }
    setResponse({ temp_message: "Checking User..." });
    // validate user
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) setResponse(() => data);
        if (data.data) {
          setResponse(() => data);

          localStorage.setItem("user_token", data.sessionToken);

          navigate(`/dashboard`, { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const userData = localStorage.getItem("user_token");
    if (userData) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <FrontComponent
        pgHeading={pgHeading}
        response={response}
        setResponse={setResponse}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Login;
