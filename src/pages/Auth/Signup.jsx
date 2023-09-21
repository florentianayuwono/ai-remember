import { useState } from "react";
import { auth } from "../../firebase_setup/FirebaseConfig";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import ReactGA from "react-ga4";

import InputForm from "../../components/common/InputForm";
import { logo2 } from "../../assets";
import CircularIndicator from "../../components/CircularIndicator";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/signup", title: "Sign Up Page" });
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setRegisterLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRegisterLoading(false);
      });
  };

  return (
    <div className="bg-secondary-darkpurple flex justify-center items-center min-h-screen text-black">
      <form className="bg-white rounded-xl px-14 py-8 m-5 text-sm flex flex-col justify-center">
        <img className="w-24 m-auto mb-4" src={logo2} />
        <InputForm
          title="Email"
          value={email}
          htmlValue="email"
          handleChange={handleEmailChange}
          placeholder="your email"
        />
        <InputForm
          title="Password"
          value={password}
          htmlValue="password"
          handleChange={handlePasswordChange}
          placeholder="password"
        />
        <InputForm
          title="Confirm Password"
          value={confirmPassword}
          htmlValue="password"
          handleChange={handleConfirmPasswordChange}
          placeholder="confirm password"
        />
        <div className="flex items-center mt-4 mb-2">
          <button
            className=" bg-purple-500 hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl"
            type="submit"
            onClick={handleSubmit}
          >
            {registerLoading ? <CircularIndicator /> : "Register"}
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 text-center">
            Login!
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
