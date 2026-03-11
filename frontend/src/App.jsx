import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthFlow from "./pages/AuthFlow";
import AppShell from "./components/AppShell";
import AddUser from "./components/AddUser";
import ViewUsers from "./components/ViewUsers";
import AssignTask from "./components/AssignTask";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthFlow />} />

        <Route path="/auth" element={<AppShell />}>
          <Route index element={<AssignTask/>}/>

          <Route path="manager/team/add" element={<AddUser />} />
          <Route path="manager/team/users" element={<ViewUsers />} />
          <Route path="manager/task/add" element={<AssignTask/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
