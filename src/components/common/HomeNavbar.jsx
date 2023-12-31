import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import { BsPersonCircle } from "react-icons/bs";
import { styles } from "../../styles";
import { homeNavLinks } from "../../constants";
import { logo, menu, close } from "../../assets";

const HomeNavbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

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
            <div className={"text-secondary-purple font-bold mx-2"}>AI-Remember</div>
          </div>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {homeNavLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-secondary-lightbrown" : "text-secondary-brown"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`/${link.id}`}>{link.title}</a>
            </li>
          ))}
          <ProfileButton toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} />
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${!toggle ? "hidden" : "flex"} p-6 violet-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {homeNavLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-primary-lightpink"
                  } hover:text-white text-[16px] font-poppins font-medium cursor-pointer`}
                  onClick={() => {
                    setToggle(!toggle);
                    setToggleProfile(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`/${link.id}`}>{link.title}</a>
                </li>
              ))}
              <ProfileButton toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProfileButton = ({ toggleProfile, setToggleProfile }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="relative inline-block">
      <div className="flex flex-row cursor-pointer" onClick={() => setToggleProfile(!toggleProfile)}>
        <BsPersonCircle className="w-[30px] h-[30px] mx-2 items-center sm:text-secondary-brown text-primary-lightpink" />
        <div className="select-none">{user?.displayName}</div>
      </div>

      {toggleProfile && (
        <div
          className="absolute mt-2 w-48 rounded-md right-0 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <button
            onClick={() => {
              signOut(auth);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 w-full"
            role="menuitem"
            id="user-menu-item-2"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
