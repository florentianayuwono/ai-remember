import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase_setup/FirebaseConfig";
import { logo2, googleicon } from "../../assets";
import CircularIndicator from "../../components/CircularIndicator";

const InputForm = ({ title, htmlValue, value, handleChange, placeholder }) => {
  return (
    <div className="mb-4 ">
      <label className="inline-block text-gray-700 mb-2" htmlFor={htmlValue}>
        {title}
      </label>
      <input className="bg-white border rounded-xl w-full py-2 px-3 placeholder:text-gray-400 text-gray-900" id={htmlValue} type={htmlValue} placeholder={placeholder} value={value} onChange={handleChange} autoComplete="off" />
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user] = useAuthState(auth);

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInititialError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/conversation");
    } else {
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);
  };

  return (
    <div className="bg-[#57375D] flex justify-center items-center min-h-screen text-black">
      <form className="bg-white rounded-xl px-14 py-8 text-sm flex flex-col justify-center ">
        <img className="w-24 m-auto mb-4" src={logo2} />
        <InputForm title="Email" value={email} htmlValue="email" handleChange={handleEmailChange} placeholder="your email*" />
        <InputForm title="Password" value={password} htmlValue="password" handleChange={handlePasswordChange} placeholder="password *" />
        <div className="flex items-center justify-between mt-4 mb-2">
          <button className=" bg-purple-500 hover:bg-purple-700 text-white w-full  py-2 px-4 rounded-3xl" type="submit" onClick={handleSubmit}>
            {loginLoading ? <CircularIndicator /> : "Login"}
          </button>
        </div>
        <p>
          Don't have an account yet?{" "}
          <a href="#" className="text-purple-500">
            Sign Up!
          </a>
        </p>
        <a href="#" className="text-purple-500 flex items-center">
          Forgot Password?
        </a>

        <div className="mt-8 flex items-center justify-between">
          <button className="outline outline-purple-500 bg-white hover:bg-purple-400 text-black w-full  py-2 px-4 rounded-3xl flex items-center" type="submit" onClick={handleSubmit}>
            <img src={googleicon} className="w-6 mr-4" />
            Continue with Google
          </button>
        </div>
        {loginError !== "" && <div className="text-red-500">{loginError}</div>}
        {loginMsg !== "" && <div className="text-green-500">{loginMsg}</div>}
      </form>
    </div>
  );
};

export default Login;
