import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import AppLayout from "./layout/app-layout";
import Users from "./Pages/users/Users";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/:status" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
