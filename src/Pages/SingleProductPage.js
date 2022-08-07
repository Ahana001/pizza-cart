import { useNavigate } from 'react-router-dom';
import SingleProduct from '../Components/SingleProduct';
import NavBar from '../Components/NavBar';

const SingleProductPage = () => {
    const navigate = useNavigate();
    return <>
        <NavBar />
        <div className='sm:container sm:mx-auto m-2'>
            <button className='mt-5 text-3xl' onClick={() => {
                navigate(-1)
            }}>👈</button>
        </div>
        <SingleProduct />
    </>
}
export default SingleProductPage;