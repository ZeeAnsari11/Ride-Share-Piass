import { Routes, Route } from 'react-router-dom';
import Pages from '../pages/exports';
import Navbar from "../Components/Header/Navbar";
import Footer from '../Components/Footer/Footer';
import { useLocation } from 'react-router-dom';

const Router = () => {
    const location = useLocation()
    return (
        <>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Pages.home />} />
                <Route path='/About' element={<Pages.About />} />
                <Route path='/Contact' element={<Pages.Contact />} />
                <Route path='/signup' element={<Pages.signup />} />
                <Route path='/signin' element={<Pages.signin />} />
                <Route path='/postRide' element={<Pages.PostRide/>} />
                <Route path='/search-rides' element={<Pages.SearchRides/>} />
                <Route path='/chat' element={<Pages.Chat/>} />
                <Route path='/myrides' element={<Pages.Rides/>} />
                <Route path='*' element={< Pages.Error/>}/>
            </Routes>
            {
                !location.pathname.includes("chat") &&
                <Footer />
            }
        </>
    );
}
export default Router;