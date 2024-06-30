import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MyRegisterForm from './RegMongo';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StudentTable from './Student';

function App() {
  return (
  <div>
  
          <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="/dashboard" element={<StudentTable />} />
          <Route path="/signup" element={<MyRegisterForm/>}/>
          </Routes> 
  </div>
  );
}

export default App;
