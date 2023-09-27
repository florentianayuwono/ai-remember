import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import "regenerator-runtime/runtime";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase_setup/FirebaseConfig";
import { Login, Loading, Landing, Forget, Signup, Verify, Communities, Diary, Conversation } from "./pages";
import { Post } from "./components/community/Post";

const MEASUREMENT_ID_AI = "G-Q40RWCDB0B";
const MEASUREMENT_ID_XY = "G-P3ZGZ14ZR6";
ReactGA.initialize([
  {
  trackingId: MEASUREMENT_ID_AI,
},{
  trackingId: MEASUREMENT_ID_XY,
},]
);


const App = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const [user, loading] = useAuthState(auth);

  const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

  const LoggedInRoute = ({ user, redirectPath = "/conversation", children }) => {
    if (user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };
  
  return loading ? (
    <Loading />
  ) : (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route element={<LoggedInRoute user={user} />}>
            <Route path="/login" element={<Login setCookie={setCookie} cookies={cookies} />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/verify" element={<Verify />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/communities" element={<Communities user={user} />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/post/:id" element={<Post user={user} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
