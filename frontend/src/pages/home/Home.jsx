import { Button, Image, Modal, Tabs } from "antd"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from "../../Components/cards/cards"
import Login from "../signin/login"
import banner2 from "../../assets/Images/Home/banner2.png"
import { getRide } from "../../redux/slices/RideSlice"
import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = new useDispatch()
  useEffect(() => {
    dispatch(getRide())
  }, [])

  let data = useSelector(state => state.ride.data)
  console.log("===========data===========", data);
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: `Login`,
      children: <Login />,
    },
    {
      key: '2',
      label: `Register`,
      children: <Login />,
    },
  ];
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
        <div className={styles.bannerimg}>
          <Image src={banner2} width={"100%"} preview={false} className={styles.bannerimg} />
          <Button type="primary" size="large" style={{ backgroundColor: "white", color: "black" }} shape="default" className={styles.butonRide} onClick={() => setModalOpen(true)}>Book Your Ride</Button>
        </div>
      </div>

      <div>
        {
          data.map((ride) => {
            // Missing return statement in the map callback
            return (
              <Card
                startLocation={ride.startLocation} // Assuming you have defined these variables somewhere
                endLocation={ride.endLocation}
                rideRoutes={ride.rideRoutes}
                rideType={ride.rideType}
                rideNumber={ride.rideNumber}
                ridePicture={ride.ridePicture}
              />
            );
          })
        }
      </div>
    </>
  )
}

export default Home
