import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Card from "../../components/ui/Cards";
import "../../index.css"; // Make sure global styles are applied

// Sample images (replace with dynamic data later)
const imagePaths = [
  "/assets/Birthday/image1.jpg",
  "/assets/Birthday/image2.jpg",
  "/assets/Birthday/image3.jpg",
  "/assets/Birthday/image4.jpg",
  "/assets/Birthday/image5.jpg",
];

const Birthday = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="birthday-hero d-flex align-items-center text-center text-white"
        style={{
          backgroundImage: "url('/assets/Birthday/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
        }}
      >
        <div
          className="overlay"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <h1 className="display-4 fw-bold">
            Celebrate Birthdays with Flowers 🎉
          </h1>
          <p className="lead mb-4">
            Make their day extra special with our fresh & hand-picked birthday
            flowers.
          </p>
          <Button variant="light" size="lg" className="btn-pink">
            Shop Now
          </Button>
        </Container>
      </section>

      {/* Birthday Flowers Grid */}
      <Container className="py-5">
        <h2 className="mb-4 text-center">Our Birthday Collection</h2>
        <Row>
          {imagePaths.map((path, index) => (
            <Col key={index} md={4} sm={6} xs={12} className="mb-4">
              <Card
                image={path}
                title={`Birthday Flower ${index + 1}`}
                description="Fresh blooms perfect for birthdays."
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Birthday;
