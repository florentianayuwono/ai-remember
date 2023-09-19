import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import {} from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from "../../firebase_setup/FirebaseConfig";
import { logo2 } from "../../assets";
import CircularIndicator from "../../components/CircularIndicator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user] = useAuthState(auth);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInititialError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/conversation');
    } else {
    }
  }, [])

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
    <div className="bg-white flex justify-center items-center min-h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <img className="w-24" src={logo2} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
            {loginLoading ? <CircularIndicator /> : "Login"}
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
          {loginError !== "" && (
            <div className="text-red-500">
              {loginError}
            </div>
          )}
          {loginMsg !== "" && (
            <div className="text-green-500">
              {loginMsg}
            </div>
          )}
      </form>
    </div>
  );
};

export default Login;
