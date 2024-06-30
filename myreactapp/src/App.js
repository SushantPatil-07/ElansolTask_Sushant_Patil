import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <div>
          <Routes>
        <Route path="/" element={<MyRegisterForm />}/>
          <Route path="/login" element={<MyLoginForm />} />
          <Route path="/signup" element={<MyRegisterForm/>}/>
          </Routes> 
  </div>
  );
}

export default App;
