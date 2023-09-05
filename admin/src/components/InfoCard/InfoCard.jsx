import React, { useEffect, useState } from "react";
import { Button, Col, Row, Statistic, Card } from "antd";
import styles from "./InfoCard.module.css";
const InfoCard = ({ data }) => {
  const [user, setUser] = useState({
    alluser: "0",
    verifiedUser: "0",
    NonverifiedUser: "0",
    Pendingrequest: "0"
  })
  useEffect(() => {
    let V_user = 0;
    let Non_user = 0;
    let p_user = 0;
    data.map((el) => {
      if (el.isVerified && el.requestStatus === "accepted") {
        V_user++;
      }
      else if (!el.isVerified && el.requestStatus === "rejected") {
        Non_user++;
      }
      else if (!el.isVerified && el.requestStatus === "pending") {
        p_user++;
      }
    })
    setUser({ alluser: data.length, verifiedUser: V_user, NonverifiedUser: Non_user, Pendingrequest: p_user })
  }, [data])
  return (
    <>
      <div className={styles.InforCardConatiner}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="All Users"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke" }}

            >
              <Statistic value={user.alluser} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Verified Users"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke" }}
            >
              <Statistic value={user.verifiedUser} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Non Verfied Users"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke" }}
            >
              <Statistic value={user.NonverifiedUser} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Pending Requests"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke" }}
            >
              <Statistic value={user.Pendingrequest} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InfoCard;
