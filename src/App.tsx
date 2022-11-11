import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import CartEmpty from './pages/Cart/CartEmpty';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/empty" element={<CartEmpty />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<h1>Not Found 404</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
