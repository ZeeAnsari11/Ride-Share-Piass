import { Button, Card } from 'antd';
import ChatAPI from '../../services/chat';
import { useNavigate } from 'react-router-dom';
import { Card, Modal } from 'antd';
import React, { useState } from 'react';


const Cards = ({ startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture, user }) => {
  const { Meta } = Card;
  const navigate = useNavigate();

  const handleCreateChat = async ()=>{
    if(user && user.id){
     let res =  await ChatAPI.createConservation(user.id, user.fullName);
     if(res.statusCode === 200){
      navigate("chat")
     }
     console.log(res)
    }
  }
  
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card
        onClick={() => setModalOpen(true)}
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={`http://localhost:4000/public/images/${ridePicture}`} />}
      >
        <Meta title={startLocation} description={endLocation} />
        <Button type='primary' onClick={handleCreateChat} > Chat Now</Button>
      </Card>
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className='space-y-2 w-full'>
          <img src={`http://localhost:4000/public/images/${ridePicture}`} className='object-cover' alt='ride info'/>
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
