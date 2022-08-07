import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import CartContext from '../CartContext';
const Product = (props) => {
    const { cart, setCart } = useContext(CartContext);
    const [isAdding, setAdding] = useState(false);
    let _cart = { ...cart };
    const addToCart = (e, product) => {
        e.preventDefault();
        if (!_cart.items) {
            _cart.items = {};
        }
        if (!_cart.items[product._id]) {
            _cart.items[product._id] = 1;
        } else {
            _cart.items[product._id] += 1;
        }
        if (_cart.total == null) {
            _cart.total = 0;
        }
        _cart.total += 1;
        setCart(_cart);
        setAdding(true);
    }
    useEffect(() => {
        setTimeout(() => {
            setAdding(false);
        }, 1000)
    }, [isAdding]);
    return (
        <>
            <Link to={`/product/${props.details._id}`}>
                <div className="text-center border-2 border-black p-1 hover:bg-yellow-700">
                    <img style={{ height: "200px", width: "200px" }} className="mx-auto" src={props.details.img_path} alt="pizza" />
                    <h3 className="mt-2"><b>{props.details.name}</b></h3>
                    <p className="bg-orange-900 text-white px-4 py-1 w-auto inline-block rounded-full mt-2">{props.details.size}</p>
                    <div className="flex justify-between items-center mx-3 mt-2">
                        <span>₹ {props.details.price}</span>
                        <button disabled={isAdding} onClick={(e) => { addToCart(e, props.details) }} className={`${isAdding ? "px-4 py-1 rounded-full bg-green-900 text-white text-lg" : "px-4 py-1 rounded-full border-2 border-black text-lg"}`}>ADD{`${isAdding ? "ED" : ""}`}</button>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default Product;