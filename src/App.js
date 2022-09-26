import Categories from './components/Categories';
import Header from './components/Header';
import Items from './components/Items';
import Sort from './components/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import CartEmpty from './pages/CartEmpty';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://62f4e313535c0c50e764a03d.mockapi.io/pizzas').then((response) => {
      setPizzas(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path='/' element={<Home pizzas={pizzas} isLoading={isLoading} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/empty' element={<CartEmpty />} />
          <Route path='*' element={<h1>Not Found 404</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
