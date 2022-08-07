import { Link } from "react-router-dom";
import { useContext } from 'react';
import CartContext from '../CartContext';
const NavBar = () => {
    const { cart } = useContext(CartContext);
    return (
        <>
            <div className="sm:container sm:mx-auto pt-4 flex items-center justify-between mx-2">
                <Link to={`/`}><img style={{ height: 55 }} src="/images/logo.png" alt="logo" /></Link>
                <ul className="flex">
                    <li className="mr-4 hover:bg-yellow-600 rounded-full px-4 py-2">
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li className="mr-4 hover:bg-yellow-600 rounded-full px-4 py-2">
                        <Link to={`/products`}>Products</Link>
                    </li>
                    <li>
                        <Link to={`/cart`}>
                            <div className="flex items-center bg-yellow-500 rounded-full px-4 py-2 text-xl">
                                <span><b>{!cart.total ? "0" : cart.total}</b></span>
                                <img src="/images/cart.png" style={{ height: "30px" }} alt="cart"></img>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default NavBar;