import Product from '../Components/Product';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}api/products`)
            .then(res => {
                return res.data;
            }).then(products => {
                setProducts(products)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <h1 className='sm:container sm:mx-auto mx-2 text-3xl mb-5'>Products</h1>
            <div className="sm:container sm:mx-auto mx-2 mb-10 grid lg:grid-cols-4 md:grid-cols-3  lg:gap-20 md:gap-15  grid-cols-2 gap-5">
                {
                    products.map((val) => {
                        return <Product key={val._id} details={val} />
                    })
                }
            </div>
        </>
    )
}
export default Products;
