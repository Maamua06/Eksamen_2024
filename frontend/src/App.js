import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Import pages and components
import Navbar from './components/Navbar';
import StartQuote from './pages/StartQuote';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';


function App() {
  const {user} = useAuthContext(); 
  
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route
          path='/'
          element={<StartQuote />}
        />

          <Route 
          path='/home/:user'
          element={user ? <Home /> : <Navigate to="/sign-in" /> }
          />

          <Route
          path='/sign-in'
          element={<Login />}
          />
 
          <Route
          path='/sign-up'
          element={<Signup />}
          />

          
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

