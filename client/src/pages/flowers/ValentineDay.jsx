import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../components/ui/Cards";

const imagePaths = [
  "/assets/Birthday/image1.jpg",
  "/assets/Birthday/image2.jpg",
];

const ValentineDay = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Valentine's Day Flowers</h2>
      <Row>
        {imagePaths.map((path, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-4">
            <Card image={path} title={`Flower ${index + 1}`} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ValentineDay;
