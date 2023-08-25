import React from "react";
import { Button, Col, Row, Statistic, Card } from "antd";
import styles from "./InfoCard.module.css";
const InfoCard = () => {
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
              <Statistic value={1111} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Verified Users"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke"}}
            >
              <Statistic value={1111} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Non Verfied Users"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke"}}
            >
              <Statistic value={1111} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Pending Requests"
              bordered={false}
              style={{ width: "100%", backgroundColor: "whitesmoke"}}
            >
              <Statistic value={1111} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InfoCard;
