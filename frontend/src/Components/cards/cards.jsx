import { Card } from 'antd';
import React from 'react';

const Cards = ({ startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture }) => {
  const { Meta } = Card;
  
  return (
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={`http://localhost:4000/public/images/${ridePicture}`} />}
      >
        <Meta title={startLocation} description={endLocation} />
      </Card>
  );
};

export default Cards;
