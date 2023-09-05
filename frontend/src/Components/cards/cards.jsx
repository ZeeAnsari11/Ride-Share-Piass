import { Button, Col, Image, Row, message } from 'antd';
import ChatAPI from '../../services/chat';
import { useNavigate } from 'react-router-dom';
import { Modal, Card } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const Cards = ({ startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture, user }) => {
  const { Meta } = Card;
  const navigate = useNavigate();
  const rideDetails = { startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture, user };
  const { user: userData } = useSelector(state => state.user);

  const handleCreateChat = async () => {

    if (userData && userData.id && user && user.id) {
      let res = await ChatAPI.createConservation(user.id, user.fullName);
      if (res.statusCode === 200) {
        navigate("chat")
      }
      return;
    }

    message.error("Please login first")
  }

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card
        hoverable
        cover={
          <img
            style={{ backgroundColor: "black", objectFit: "contain", height: "250px" }}
            onClick={() => setModalOpen(true)}
            alt="example"
            src={`http://localhost:4000/public/images/${ridePicture}`} />}
      >
        <Meta title={startLocation} description={endLocation} />
        <Button type='primary' size="large" onClick={handleCreateChat} style={{backgroundColor:"green",marginTop:'7px'}} > Chat Now</Button>
      </Card>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className='space-y-2 w-full'>
          <Image src={`http://localhost:4000/public/images/${ridePicture}`} className='object-cover' alt='ride info' height={"200px"} width={"100%"} style={{backgroundColor:"black"}} />
          <Button type="primary" size="large" style={{backgroundColor:"green"}} onClick={() => navigate("/RideDetail", { state: rideDetails })}>Ride Detail</Button>

          <div className='flex justify-between'>
            <p className='font-bold text-2xl'>{rideType}</p>
            <p className='text-sm text-gray-500'>Ride # {rideNumber}</p>
          </div>
          <div>
            <div className='flex justify-start items-center max-w-md overflow-auto space-x-1'><span className='text-lg'>Route</span> {rideRoutes.map((rideRoute) => (<div className='rounded-full px-2 py-1 bg-gray-300'>{rideRoute}</div>))}</div>
            <p>{startLocation} - {endLocation}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cards;
