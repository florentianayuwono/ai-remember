import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { styles } from "../../styles";
import { navLinks } from "../../constants";
import { logo, menu, close } from "../../assets";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase_setup/FirebaseConfig";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const[user, error] = useAuthState(auth);
  console.log(error);

  const LoginButton = () => {
    return (
        <button 
        onClick={() => {user ? navigate('/conversation') : navigate('/login')}}
        className=" rounded-full bg-primary-pink py-2 px-6 font-medium transition-transform transform hover:scale-110">Login</button>
    );
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 hero-background`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-9 object-contain" />
            <div className={"text-white font-bold mx-2"}>AI-Remember</div>
          </div>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link.id} className={`${active === link.title ? "text-white" : "text-primary-lightpink"} hover:text-white text-[18px] font-medium cursor-pointer`} onClick={() => setActive(link.title)}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <LoginButton/>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
          <div className={`${!toggle ? "hidden" : "flex"} p-6 violet-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${active === link.title ? "text-white" : "text-primary-lightpink"} hover:text-white text-[16px] font-poppins font-medium cursor-pointer`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <LoginButton />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
