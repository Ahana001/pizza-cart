
import { useEffect, useState } from 'react';
import TableProduct from '../Components/TableProduct';
import axios from 'axios';
const Pagination = (props) => {
    const [products, setProducts] = useState([]);
    const dataLimit = 3;
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_SERVER_URL}api/products?page=${props.currentPage}&limit=${dataLimit}`,
        })
            .then(res => {
                return res.data
            })
            .then(res => {
                setProducts(res)
            });

    }, [props.currentPage]);

    return (
        <>
            <table className='w-full container mx-auto mt-5'>
                <tbody>
                    {
                        products.map((val) => {
                            return <TableProduct key={val._id} details={val} />
                        })
                    }
                </tbody>
            </table>


        </>);
}
export default Pagination;
