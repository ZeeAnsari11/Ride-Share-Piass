import { Button, Col, Image, Row, Typography } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Card from "../../Components/cards/cards"
import backgroundImage from "../../assets/Images/backgroundImage.png"
import homeCar from "../../assets/Images/HomeModule.png"
import grass from "../../assets/Images/grass.png"
import Shape from "../../assets/Images/Shape.png"
import Cloud from "../../assets/Images/Cloude.png"
import { getRide } from "../../redux/slices/RideSlice"
import Cloude2 from "../../assets/Images/Cloude2.png"
import styles from "./Home.module.css"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = new useDispatch()
  useEffect(() => {
    dispatch(getRide())
  }, [])

  let data = useSelector(state => state.ride.data)
  const [inputStr, setInputStr] = useState('');
  return (
    <>
      <div className={styles.main}>
        <div className={styles.bannerimgContainer}>
          <Image src={backgroundImage} width={"100%"} preview={false} className={styles.bannerimg} />
        </div>
        <div className={styles.HomeCarContainer}>
          <Image src={homeCar} preview={false} className={styles.HomeCar} width="250px" />
        </div>
        <div className={styles.grassimageContainer}>
          <Image src={grass} preview={false} width="250px" />
        </div>
        <div className={styles.grassimageContainerLeft}>
          <Image src={grass} preview={false} width="250px" />
        </div>
        <div className={styles.ShapeImage}>
          <Image src={Shape} preview={false} width="250px" />
        </div>
        <div className={styles.CloudeImage}>
          <Image src={Cloud} preview={false} width="250px" />
        </div>
        <div className={styles.CloudeImage2}>
          <Image src={Cloude2} preview={false} width="250px" />
        </div>
        <div className={styles.TextonImage}>
          <p>Get Your <span>Ride</span> From most Trusting Platfarm </p>
        </div>
        <div className={styles.ButtonImage}>
          <Button style={{ backgroundColor: "green", color: "white", width: "150px", fontSize: "14px" }} size="large" onClick={()=>navigate("search-rides")}>Book Ride</Button>
        </div>
      </div>
      <p className={styles.title}> Top Rides </p>
      <div className={styles.Card}>
        <Row gutter={[24, 16]}>
          {
            data?.slice(0, 10).map((ride, index) => (
              <Col xs={24} sm={24} md={12} lg={6} xl={6} key={index}>
                <Card
                  {...ride}
                />
              </Col>
            ))
          }
        </Row>
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

export default Home
