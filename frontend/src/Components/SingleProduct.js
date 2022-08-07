import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import CartContext from "../CartContext";
const SingleProduct = () => {
    let { id } = useParams();
    let { cart, setCart } = useContext(CartContext);
    const [product, setProduct] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}product/${id}`)
            .then(res => {
                return res.data[0];
            }).then(pro => {
                setProduct(pro)
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);
    function addCart(event, id) {
        let _cart = { ...cart };
        if (!_cart.items) {
            _cart.items = {};
        }
        if (!_cart.items[id]) {
            _cart.items[id] = 1;
        } else {
            _cart.items[id] += 1;
        }
        if (_cart.total == null) {
            _cart.total = 0;
        }
        _cart.total += 1;
        setCart(_cart);
        setIsAdding(true);

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    }
    return (
        <>
            <div className="sm:container sm:mx-auto m-2 mt-10 flex items-center justify-items-start">
                <img style={{ height: 200 }} src={product.img_path} alt="pizza" />
                <div className="ml-5">
                    <h3><b>{product.name}</b></h3>
                    <p className="bg-orange-900 text-white px-4 py-1 w-auto inline-block rounded-full mt-2">{product.size}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="mr-2">₹ {product.price}</span>
                        <button onClick={(e) => { addCart(e, product._id) }} disabled={isAdding} className={`${isAdding ? "px-4 py-1 rounded-full bg-green-900 text-white text-lg" : "px-4 py-1 rounded-full border-2 border-black text-lg"}`}>ADD {isAdding ? 'ED' : ''}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SingleProduct;
