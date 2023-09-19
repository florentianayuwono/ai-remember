import { BrowserRouter, Route, Routes,Navigate, Outlet } from "react-router-dom";

import { Login, Landing } from "./pages";
import Conversation from "./pages/Conversation";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./firebase_setup/FirebaseConfig";
import Communities from "./pages/Communities";
import Diary from "./pages/Diary";

const App = () => {

  const[user, error] = useAuthState(auth);
  console.log(error);

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
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute authorised={user} />}>
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/diary" element={<Diary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
