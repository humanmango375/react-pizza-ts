import Header from './components/Header';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import CartEmpty from './pages/Cart/CartEmpty';
import { useState } from 'react';
import { createContext } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/empty" element={<CartEmpty />} />
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Routes>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
