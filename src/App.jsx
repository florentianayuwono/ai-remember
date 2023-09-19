import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase_setup/FirebaseConfig";
import { Login, Landing, Forget, Signup, Verify, Communities, Diary, Conversation } from "./pages";
import { useEffect } from "react";

const App = () => {
  const [user, error] = useAuthState(auth);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log(cookies.user);
  }, [cookies.user]);

  const ProtectedRoute = ({ authorised, redirectPath = "/login", children, setShowMenus }) => {
    if (!authorised) {
      return <Navigate to={redirectPath} replace />;
    }
    setTimeout(() => setShowMenus(true), 0);
    return children ? children : <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/login" element={<Login setCookie={setCookie} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/conversation" element={<Conversation />} />

        <Route element={<ProtectedRoute authorised={user} />}>
          <Route path="/communities" element={<Communities />} />
          <Route path="/diary" element={<Diary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
