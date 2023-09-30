import { logo2 } from "../../assets";
import { useEffect, useState } from "react";
import { auth } from "../../firebase_setup/FirebaseConfig";
import InputForm from "../../components/common/InputForm";
import ReactGA from "react-ga4";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { LANDING_PAGE } from "../../constants";
import toast from "react-hot-toast";
import { CircularIndicator } from "../../components";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/forget", title: "Forget Password Page" });
  }, [])

  const actionCodeSettings = {
    url: LANDING_PAGE,
    handleCodeInApp: true,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(
      email,
      actionCodeSettings
    );
    if (success) {
      toast.success("Email sent!")
    }
  };

  return (
    <div className="bg-[#57375D] flex justify-center items-center min-h-screen text-black">
      <form className="bg-white rounded-xl px-14 py-8 text-sm flex flex-col justify-center ">
        <img className="w-24 m-auto mb-4 cursor-pointer" src={logo2} onClick={() => {navigate('/')}} />
        <InputForm title="Email" value={email} htmlValue="email" handleChange={handleEmailChange} placeholder="your email*" />
        {error !== undefined && <div className="text-red-500">{error.message}</div>}
        <div className="flex items-center justify-between mt-4 mb-2">
          <button className=" bg-purple-500 flex justify-center items-center hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl" type="submit" onClick={handleSubmit}>
            {sending? <CircularIndicator /> : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forget;
