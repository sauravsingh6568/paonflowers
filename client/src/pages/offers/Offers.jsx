import React, { useState } from "react";
import offersData from "../../data/offersData";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Offers = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
      alert(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} is already in the cart.`);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">💐 Today's Special Offers</h2>
      <Row>
        {offersData.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div>
                  <span className="text-muted text-decoration-line-through">
                    ₹{product.originalPrice}
                  </span>{" "}
                  <span className="fw-bold text-success">
                    ₹{product.discountPrice}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Offers;
