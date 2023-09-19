import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import InputForm from "../../components/common/InputForm";
import { auth } from "../../firebase_setup/FirebaseConfig";
import { logo2, googleicon } from "../../assets";
import CircularIndicator from "../../components/CircularIndicator";

const Login = ( {setCookie, cookies} ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInititialError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle();
  } 

  useEffect(() => {
    if (error || googleError) {
      console.log(error);
      setLoginLoading(false);
    }
  },[error])

  useEffect(() => {
    if (user || googleUser) {
      setLoginLoading(false);
      //set cookie for the entire app
      setCookie('email', email, { path: '/',})
      setCookie('password', password, { path: '/',})
      navigate("/conversation");
    }
  }, [user, googleUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    await signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="bg-secondary-darkpurple flex justify-center items-center min-h-screen text-black">
      <form className="bg-white rounded-xl px-14 py-8 m-5 text-sm flex flex-col justify-center">
        <img className="w-24 m-auto mb-4" src={logo2} />
        <InputForm title="Email" value={email} htmlValue="email" handleChange={handleEmailChange} placeholder="your email" />
        <InputForm title="Password" value={password} htmlValue="password" handleChange={handlePasswordChange} placeholder="password" />
        <div className="flex items-center mt-4 mb-2">
          <button className=" bg-purple-500 hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl" type="submit" onClick={handleSubmit}>
            {loginLoading ? <CircularIndicator /> : "Login"}
          </button>
        </div>
        <p className="text-center">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-purple-500">
            Sign Up!
          </a>
        </p>
        <a href="/forget" className="text-purple-500 text-center">
          Forgot Password?
        </a>

        <div className="mt-8 flex items-center justify-between">
          <button className="outline outline-purple-500 bg-white hover:bg-purple-400 text-black w-full py-2 px-4 rounded-3xl flex items-center" type="submit" onClick={handleGoogleSignIn}>
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
