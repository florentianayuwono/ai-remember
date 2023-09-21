import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { styles } from "../../styles";
import { homeNavLinks } from "../../constants";
import { logo, menu, close } from "../../assets";

const HomeNavbar = ({ user }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const navigate = useNavigate();

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
            <li key={link.id} className={`${active === link.title ? "text-secondary-lightbrown" : "text-secondary-brown"} hover:text-white text-[18px] font-medium cursor-pointer`} onClick={() => setActive(link.title)}>
              <a href={`/${link.id}`}>{link.title}</a>
            </li>
          ))}
          <ProfileButton toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} />
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />
          <div className={`${!toggle ? "hidden" : "flex"} p-6 violet-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {homeNavLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${active === link.title ? "text-white" : "text-primary-lightpink"} hover:text-white text-[16px] font-poppins font-medium cursor-pointer`}
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
  return (
    <div className="relative inline-block">
      <BsPersonCircle className="w-[30px] h-[30px] sm:text-secondary-brown text-primary-lightpink" onClick={() => setToggleProfile(!toggleProfile)} />
      {toggleProfile && (
        <div className="absolute mt-2 w-48 rounded-md right-0 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">
            Your Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">
            Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
