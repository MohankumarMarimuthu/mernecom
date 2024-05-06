import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './pages/User';
import "../src/styles/App.css";
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/admin/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/user' element={<User />} />
          <Route path='/user/cart' element={<Cart />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<Admin />} />
        </Route>
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
