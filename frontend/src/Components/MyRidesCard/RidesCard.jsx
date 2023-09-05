import React from 'react'
import styles from "./Rides.module.css"
import { Col, Row, Typography, Image, Card } from 'antd';
import image from "../../assets/Images/Home/free.png"
import {Link } from "react-router-dom"
const RidesCard = () => {
  return (
    <>
    <p className={styles.Header}>
        My Rides
      </p>
      <div style={{margin:"20px"}}>
      <Row  gutter={[18, 18]} >
          <Col span={6} lg={6} md={8} sm={12} xs={24}>
            <Card className={styles.Card_style} >
              <Image className={styles.image} src={image} />
              <Link to={""} target="__blank">
                <p className={styles.text}>Title</p>
              </Link>
            </Card>
          </Col>
          
      </Row >
      </div>
    </>
  )
}

export default RidesCard;