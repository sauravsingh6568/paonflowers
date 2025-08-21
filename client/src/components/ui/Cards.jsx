import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const Cards = ({ image, title, id, price }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id,
        name: title,
        price,
        image,
      },
    });
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={image}
        className="object-fit-cover"
        height={250}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-center">{title}</Card.Title>
          <p className="text-center text-muted">₹{price}</p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          className="mt-2 w-100"
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
