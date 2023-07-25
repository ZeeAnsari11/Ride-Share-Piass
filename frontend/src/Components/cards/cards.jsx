import { Button, Card } from 'antd';
import React from 'react';
import ChatAPI from '../../services/chat';
import { useNavigate } from 'react-router-dom';

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
  
  return (
      <Card
        
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={`http://localhost:4000/public/images/${ridePicture}`} />}
      >
        <Meta title={startLocation} description={endLocation} />
        <Button type='primary' onClick={handleCreateChat} > Chat Now</Button>
      </Card>
  );
};

export default Cards;
