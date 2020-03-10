import React from "react";
import { Card, Button } from "react-bootstrap";

const ListItem = ({ item, addToCart }) => {
  return (
    <li>
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h4">{`${item.name} - $${item.price}`}</Card.Header>
        <Card.Body>
          <Card.Text>{item.description}</Card.Text>
          <Button onClick={() => addToCart(item)} variant="primary">
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </li>
  );
};

export default ListItem;
