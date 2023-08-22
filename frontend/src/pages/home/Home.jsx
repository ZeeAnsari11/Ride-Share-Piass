import { Button, Image, Typography } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import  { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Card from "../../Components/cards/cards"
import Login from "../signin/login"
import Register from "../signup/Register"
import banner2 from "../../assets/Images/Home/banner2.png"
import { getRide } from "../../redux/slices/RideSlice"
import styles from "./Home.module.css"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = new useDispatch()
  useEffect(() => {
    dispatch(getRide())
  },[])

  let data = useSelector(state => state.ride.data)
  const [inputStr, setInputStr] = useState('');
  return (
    <>
      <div className={styles.main}>
        <div className={`${styles.bannerimg} space-y-4`}>
          <Image src={banner2} width={"100%"} preview={false} className={styles.bannerimg} />
          <button className="absolute left-14 top-[25rem] text-white hover:text-blue-700 bg-transparent hover:bg-white font-semibold py-2 px-4 border border-white-500 hover:border-transparent rounded" onClick={() => navigate("/PostRide")}>
            Book Your Ride
          </button>
        </div>
      </div>
      <Typography.Title style={{textAlign: "center"}}> Top Rides </Typography.Title>
      <div className={styles.Card}>
        {
          data?.slice(0, 10).map((ride) => {
            if (ride.startLocation.toLowerCase().includes(inputStr.toLowerCase()) || ride.endLocation.toLowerCase().includes(inputStr.toLowerCase()) )
            // Missing return statement in the map callback
            return (
              // eslint-disable-next-line react/jsx-key
              <Card
                startLocation={ride.startLocation} // Assuming you have defined these variables somewhere
                endLocation={ride.endLocation}
                rideRoutes={ride.rideRoutes}
                rideType={ride.rideType}
                rideNumber={ride.rideNumber}
                ridePicture={ride.ridePicture}
                user={ride.user}
              />
            );
          })
        }
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

export default Home
