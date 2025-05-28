import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Component/register';
import Login from './Component/login';
import Dashboard from './Component/dashboard';
import Logout from './Component/logout';
import Project from './Component/project';
import Startproject from './Component/project/start';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Employees from './Component/employees';
import Interruption from './Component/interruption';
import Task from './Component/project/task';



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/project" element={<Project />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/interruption" element={<Interruption />} />
        <Route path="/project/start/:id" element={<Startproject />} />
        <Route path="/project/task/:id" element={<Task />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
