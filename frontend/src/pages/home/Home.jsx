import { Button, Image, Modal, Tabs } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import  { useEffect, useState } from 'react'

import Card from "../../Components/cards/cards"
import Login from "../signin/login"
import Register from "../signup/Register"
import banner2 from "../../assets/Images/Home/banner2.png"
import { getRide } from "../../redux/slices/RideSlice"
import styles from "./Home.module.css"

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = new useDispatch()
  useEffect(() => {
    dispatch(getRide())
  },[])

  let data = useSelector(state => state.ride.data)
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Login`,
      children: <Login displayImage={false}/>,
    },
    {
      key: '2',
      label: `Register`,
      children: <Register displayImage={false}/>,
    },
  ];
  const [inputStr, setInputStr] = useState('');
  return (
    <>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

      </Modal>
      <div className={styles.main}>
        <div className={`${styles.bannerimg} space-y-4`}>
          <Image src={banner2} width={"100%"} preview={false} className={styles.bannerimg} />
          <button className="absolute left-14 top-[25rem] text-white hover:text-blue-700 bg-transparent hover:bg-white font-semibold py-2 px-4 border border-white-500 hover:border-transparent rounded" onClick={() => setModalOpen(true)}>Book Your Ride</button>
          <form className="w-1/2 mx-auto shadow flex justify-center items-center">   
              <label for="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                  <input value={inputStr} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search Rides..." required onChange={(e) => setInputStr(e.target.value)}/>
              </div>
              <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                  <span className="sr-only">Search</span>
              </button>
            </form>
        </div>
      </div>

      <div className='flex'>
        {
          data.map((ride) => {
            if (ride.startLocation.toLowerCase().includes(inputStr.toLowerCase()) || ride.endLocation.toLowerCase().includes(inputStr.toLowerCase()) )
            // Missing return statement in the map callback
            return (
              // eslint-disable-next-line react/jsx-key
              <>
                <Card
                  startLocation={ride.startLocation} // Assuming you have defined these variables somewhere
                  endLocation={ride.endLocation}
                  rideRoutes={ride.rideRoutes}
                  rideType={ride.rideType}
                  rideNumber={ride.rideNumber}
                  ridePicture={ride.ridePicture}
                />
              </>
            );
          })
        }
      </div>
    </>
  )
}

export default Home
