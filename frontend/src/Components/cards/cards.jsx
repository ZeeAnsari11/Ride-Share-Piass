// import { Card } from 'antd'
// import React from 'react'
// const cards = ({startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture}) => {
//     const { Meta } = Card;
//   return (
//     <>
//      <Card
//     hoverable
//     style={{
//       width: 240,
//     }}
//     cover={<img alt="example" src={ridePicture} />}>
//     <Meta title={startLocation} description={endLocation} />
//   </Card>
//     </>
//   )
// }

// export default cards\
import { Card } from 'antd';
import React from 'react';

const Cards = ({ startLocation, endLocation, rideRoutes, rideType, rideNumber, ridePicture }) => {
  const { Meta } = Card;

  // Construct the relative path to the image based on the folder structure
  const imagePath = `backend/public/images/${ridePicture}`;
console.log("===imagePath=========",imagePath);
  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={imagePath} />}
      >
        <Meta title={startLocation} description={endLocation} />
      </Card>
    </>
  );
};

export default Cards;
