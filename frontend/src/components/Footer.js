import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by Aurko with{" "}
            <i class="fas fa-heart" style={{ color: "red" }}></i>
            <i class="far fa-heart" style={{ color: "red" }}></i>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
