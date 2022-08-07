import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { useContext } from 'react';
import CartContext from '../CartContext';
const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [_Items, setItems] = useState([]);
    const [priceFetched, setFetched] = useState(false);
    let total = 0;
    const getQuantity = (ID) => {
        return cart.items[ID];
    }
    const deleteItem = (event, id) => {
        let _cart = { ...cart };
        let quatity = getQuantity(id);
        delete _cart.items[id];
        _cart.total -= quatity;
        const updatedProductsList = _Items.filter(val => val._id !== id);
        setItems(updatedProductsList);
        setCart(_cart);
    }
    const decreament = (event, id) => {
        let _cart = { ...cart };
        if (_cart.items[id] === 1) {
            return;
        }
        _cart.items[id] -= 1;
        _cart.total -= 1;
        setCart(_cart);
    }
    const increament = (event, id) => {
        let _cart = { ...cart };
        if (_cart.items[id] === 50) {
            return;
        }
        _cart.items[id] += 1;
        _cart.total += 1;
        setCart(_cart);
    }
    const getSum = (id, price) => {
        const sum = price * getQuantity(id);
        total += sum;
        return sum;
    }
    function debounce(fn) {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, 100);
        }
    }
    const handleOrderNow = () => {
        window.alert('Order placed succesfully!');
        setItems([]);
        setCart({});
    }
    useEffect(() => {
        if (!cart.items) {
            return;
        }
        if (priceFetched) {
            return;
        }
        let ids = Object.keys(cart.items);
        // Send a POST request
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}products/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(ids)
        }).then(responce => {
            setFetched(true);
            setItems(responce.data);
        });
    }, [cart]);
    return (
        <>
            <NavBar />
            {
                !_Items.length
                    ? <div className='container mx-auto flex justify-center mt-10'><img src='/images/empty_cart.svg' style={{ height: "300px" }} alt='Empty-cart' /></div>
                    :
                    <div className='sm:container sm:mx-auto m-2 mt-5'>
                        <table className='w-full'>
                            <tbody>
                                {_Items.map(val => {
                                    return <tr key={val._id}>
                                        <th><img className='mb-3' style={{ height: "100px" }} src={val.img_path} alt="pizza"></img></th>
                                        <th><span><b>{val.name}</b></span></th>
                                        <th>
                                            <button className='sm:px-3 sm:py-1 px-1 rounded bg-yellow-500 sm:text-2xl' onClick={(e) => { decreament(e, val._id) }}><b><i className="fa-solid fa-minus"></i></b></button>
                                        </th>
                                        <th><b>{getQuantity(val._id)}</b></th>
                                        <th>
                                            <button className='sm:px-3 sm:py-1 px-1 rounded bg-yellow-500 sm:text-2xl' onClick={(e) => { increament(e, val._id) }}><b><i className="fa-solid fa-plus"></i></b></button>
                                        </th>
                                        <th>
                                            <p>₹</p>
                                        </th>
                                        <th>
                                            <p>{getSum(val._id, val.price)}</p>
                                        </th>
                                        <th>
                                            <button className='sm:px-3 sm:py-1 px-1 rounded bg-red-500 sm:text-2xl text-white' onClick={(e) => { deleteItem(e, val._id) }}>Delete</button>
                                        </th>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <hr className="border-black border-1 mt-3" />
                        <div className='text-right mt-3'>
                            <h1><b>Grand total : {total}</b></h1>
                            <button onClick={debounce(handleOrderNow)} className='px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600  mt-3 text-lg'>Order now</button>
                        </div>
                    </div>
            }
        </>
    )
}
export default Cart;
