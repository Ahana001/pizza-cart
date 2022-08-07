import NavBar from '../Components/NavBar';
import Products from '../Components/Products';
const Home = () => {
    return (
        <>
            <NavBar />
            <div className='sm:container sm:mx-auto flex items-center mx-5 pt-5'>
                <div className='w-1/2'>
                    <h1 className='sm:text-3xl lg:text-5xl'><b>It's not just Food, </b></h1>
                    <h1 className='sm:text-3xl lg:text-5xl'><b>it's an Experience</b></h1>
                    <h2 className='text-lg md:text-4xl'><em>Are You Hungry?</em></h2>
                    <p className='text-lg md:text-2xl'>Don't Wait!</p>
                    <button className='px-4 py-2 rounded-full bg-yellow-600 hover:bg-yellow-700  mt-8 text-lg'>Order now</button>
                </div>
                <div  className='w-1/2 text-lg'>
                    <img src='/images/hero.png' alt='hero'/>
                </div>
            </div>
            <Products/>
        </>
    )
}
export default Home;