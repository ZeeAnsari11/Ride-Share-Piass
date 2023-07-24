import { Routes, Route } from 'react-router-dom';
import Pages from '../pages/exports';
import Navbar from "../Components/Header/Navbar";
import Footer from '../Components/Footer/Footer';

const Router = () => {
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
                <Route path='*' element={< Pages.Error/>}/>
            </Routes>
            <Footer />
        </>
    );
}
export default Router;