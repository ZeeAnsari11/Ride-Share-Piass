import React from 'react'
import { Image, Row, Col, Button, Card, } from "antd";
import { useLocation } from 'react-router-dom';
import { FaLocationDot, FaUser, FaRoute, } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa"
import { AiFillCar } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import image from "../../assets/Images/cloude.png"
import "./RideDetail.scss"
import "./Timeline.scss"
import { useSelector } from 'react-redux';
const RideDetail = () => {
    const location = useLocation();
    const rideDetails = location.state || {};
    const {user} = useSelector((state => state.user))
    console.log(rideDetails)
    const handlebookedRide = ()=>{
        if(rideDetails.passengers.length!== rideDetails.noofPassenger){
            
        }
    }
    return (
        <>
            <div className={"main_container"} >
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={24} lg={8} className={"side_one"}>
                        <Image src={`http://localhost:4000/public/images/${rideDetails?.ridePicture}`} preview={false} alt='ride info' />
                        <div style={{ margin: "20px" }}>
                            <Button type="primary" size="large" style={{ backgroundColor: "green", }} onClick={handlebookedRide}>Confirm Your Ride</Button>
                        </div>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={6}>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaUser style={{ fontSize: "22px", marginRight: "5px" }} />Rider Name
                            </div>
                            <p className={"userName"}>{rideDetails.user?.fullName}</p>
                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}><AiFillCar style={{ fontSize: "22px", marginRight: "5px" }} />Ride Type
                            </div>
                            <p className={"userName"}>{rideDetails.rideType}</p>
                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaLocationDot style={{ fontSize: "22px", marginRight: "5px" }} /> Start Location
                            </div>
                            <p className={"userName"}>{rideDetails.startLocation}</p>
                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaLocationDot style={{ fontSize: "22px", marginRight: "5px" }} />End Location
                            </div>
                            <p className={"userName"}>{rideDetails.endLocation}</p>
                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaWalking style={{ fontSize: "22px", marginRight: "5px" }} />No of passengers
                            </div>
                            <p className={"userName"}>{rideDetails.noofPassenger}</p>
                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaWalking style={{ fontSize: "22px", marginRight: "5px" }} />Booked Passengers
                            </div>
                            {
                                rideDetails.user?._id === user?.id ?
                                    <div className={"booke_passengerContainer"}>
                                        <Card style={{ width: "100px", margin: "10px" }}>
                                            <Image src={image} height={"50px"} width={"50px"} preview={false} />
                                            <p>Passenger Name</p>
                                        </Card>
                                        <Card style={{ width: "100px", margin: "10px" }}>
                                            <Image src={image} height={"50px"} width={"50px"} preview={false} />
                                            <p >Passenger Name</p>
                                        </Card>
                                    </div> :
                                    <div>
                                        <p className={"userName"}>{rideDetails.passengers?.length}</p>
                                    </div>
                            }


                        </div>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaRoute style={{ fontSize: "22px", marginRight: "5px" }} />Ride No
                            </div>
                            <p className={"userName"}>#{rideDetails.rideNumber}</p>

                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={10}>
                        <div className={"data-item"}>
                            <div className={"flex"}>
                                <FaRoute style={{ fontSize: "22px", marginRight: "5px" }} />Ride Routes
                            </div>
                        </div>
                        {
                            rideDetails.rideRoutes?.map((el, index) => (
                                <div id="timeline" key={index}>
                                    <div className="timeline-item">
                                        <div className="timeline-icon"><BsStarFill color='white' size={22} /></div>
                                        <div className={`timeline-content ${index % 2 === 0 ? "right" : ""}`}>
                                            <h2>{el}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </Col>

                </Row>

            </div>
        </>
    )
}

export default RideDetail
