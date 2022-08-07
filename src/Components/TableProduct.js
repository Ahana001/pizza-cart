import { useContext, useState } from 'react';
import CartContext from '../CartContext';

const TableProduct = (props) => {
    let { details } = props;
    const [isAdding, setIsAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    let _cart = { ...cart };
    const addToCart = (e, product) => {
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
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000)
    }
    return (
        <tr>
            <th><img className='mb-3' style={{ height: "100px" }} src={details.img_path} alt="pizza"></img></th>
            <th><span><b>{details.name}</b></span></th>
            <th>
                <p>₹</p>
            </th>
            <th>
                <p>{details.price}</p>
            </th>
            <th>
                <button className={isAdding ? 'sm:px-3 sm:py-1 px-1 rounded bg-green-600 sm:text-2xl text-white' : 'sm:px-3 sm:py-1 px-1 rounded bg-green-500 sm:text-2xl text-white'} onClick={(e) => { addToCart(e, details) }}>ADD</button>
            </th>
        </tr>
    );
}
export default TableProduct;