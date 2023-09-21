import { logo2 } from "../../assets";
import { useState } from "react";
import InputForm from "../../components/common/InputForm";
import ReactGA from "react-ga4";

const Verify = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/verify", title: "Verify Password Page" });
  }, [])


  const handleCodeChange = (e) => {
    setToken(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#57375D] flex justify-center items-center min-h-screen text-black">
      <form className="bg-white rounded-xl px-14 py-8 text-sm flex flex-col justify-center ">
        <img className="w-24 m-auto mb-4" src={logo2} />
        <InputForm title="Verification code" value={token} htmlValue="token" handleChange={handleCodeChange} placeholder="verification code *" />
        <div className="flex items-center justify-between mt-4 mb-2">
          <button className=" bg-purple-500 hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl" type="submit" onClick={handleSubmit}>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
