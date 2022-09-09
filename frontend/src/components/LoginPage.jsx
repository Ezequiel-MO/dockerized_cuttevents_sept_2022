import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../axios/axiosConfig";
import { useUserLog } from "../hooks/useUserLog";
import { useCurrentProject } from "../hooks/useCurrentProject";
import { useBudget } from "../hooks/useBudget";
import Alert from "../ui/Alert";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentProject, currentProject } = useCurrentProject();
  const { setBudgetSchedule } = useBudget();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { logUserIn } = useUserLog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlert({
        error: true,
        msg: "Please fill in all fields",
      });
      return;
    }
    try {
      const response = await baseAPI.get(`/v1/projects?code=${password}`);
      const receivedData = response.data.data.data.length !== 0;

      if (!receivedData) {
        setAlert({
          error: true,
          msg: "Invalid password, please check your email instructions",
        });
        return;
      }
      const clientEmail = response.data.data.data[0].clientAccManager[0].email;

      if (email !== clientEmail) {
        setAlert({
          error: true,
          msg: "Invalid email, please check your email instructions",
        });
        return;
      }

      localStorage.setItem(
        "schedule",
        JSON.stringify(response.data.data.data[0].schedule)
      );

      setAlert({
        error: false,
        msg: "Access Granted",
      });
      logUserIn();
      localStorage.setItem("userIsLogged", true);
      setCurrentProject(response.data.data.data[0]);
      setBudgetSchedule(response.data.data.data[0].schedule);
      navigate("/app");
    } catch (error) {
      setAlert({
        error: true,
        msg: "Invalid email or password",
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Login <span className="text-white-100">to APP</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-8 bg-gray-50 rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            USER EMAIL - provided in the email
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            id="email"
            type="text"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Code - must be 11 digits long
          </label>
          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            id="password"
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
