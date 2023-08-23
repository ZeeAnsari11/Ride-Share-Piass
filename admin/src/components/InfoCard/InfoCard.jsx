import React from "react";
import { Button, Col, Row, Statistic, Card } from "antd";
import styles from "./InfoCard.module.css";
const InfoCard = () => {
  return (
    <>
      <div className={styles.InforCardConatiner}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="All Users"
              bordered={false}
              style={{ width: "300px", backgroundColor: "whitesmoke" }}
            >
              <Statistic value={1111} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Verified Users"
              bordered={false}
              style={{ width: "300px", backgroundColor: "whitesmoke"}}
            >
              <Statistic value={1111} />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Non Verfied Users"
              bordered={false}
              style={{ width: "300px", backgroundColor: "whitesmoke"}}
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
