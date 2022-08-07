import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
import Items from './Pages/Items';
import SingleProductPage from './Pages/SingleProductPage';
import CartContext from './CartContext';
import { useEffect, useState } from 'react';
import Cart from './Pages/Cart';
const App = () => {
    const [cart, setCart] = useState({});
    useEffect(() => {
        const cart1 = window.localStorage.getItem('cart');
        setCart(JSON.parse(cart1));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart }}>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/products' element={<Items />}></Route>
                        <Route path='/product/:id' element={<SingleProductPage />}></Route>
                        <Route path='/cart' element={<Cart />}></Route>
                        <Route path='*' element={<NoPage />}></Route>
                    </Routes>
                </CartContext.Provider>
            </Router>
        </>
    );
}
export default App;