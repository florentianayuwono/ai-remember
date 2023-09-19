import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login, Landing } from "./pages";
import Conversation from "./pages/Conversation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
