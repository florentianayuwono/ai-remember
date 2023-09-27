import { useState, useEffect } from "react";
import { auth } from "../../firebase_setup/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import ReactGA from "react-ga4";

import { logo2 } from "../../assets";
import { CircularIndicator, InputForm } from "../../components";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, firebaseerror] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/signup",
      title: "Sign Up Page",
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) {
      setError("Please agree to the privacy policy.");
      return;
    }

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password != confirmPassword) {
      setError("Unmatching passwords.");
      return;
    }
    if (password.length < 6) {
      setError("Password need to be longer than 6 characters.");
      return;
    }
    await createUserWithEmailAndPassword(email, password).catch((err) => {
      console.log("ERROR");
      console.log(err);
    });
    if (firebaseerror != undefined) {
      setError(firebaseerror.message);
      return;
    }
    await signOut(auth);
    navigate("/login");
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
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="privacyCheckbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="privacyCheckbox">
            I agree to the{" "}
            <a href="/privacy-policy" className="text-purple-500">
              Privacy Policy
            </a>
          </label>
        </div>
        {error !== "" && <div className="text-red-500">{error}</div>}
        <div className="flex items-center mt-4 mb-2">
          <button
            className=" flex justify-center bg-purple-500 hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? <CircularIndicator /> : "Register"}
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
