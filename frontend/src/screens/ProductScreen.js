import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormControl,
} from "react-bootstrap";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: erorProductReview, success: successProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3> {product.name} </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color="#f8e8"
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <span>Price: ${product.price} </span>
                </ListGroupItem>
                <ListGroupItem>
                  <span>Description: {product.description} </span>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong> ${product.price} </strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <ListGroupItem>
                      <Button
                        onClick={addToCartHandler}
                        variant="success"
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroupItem>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p> {review.createdAt.substring(0, 10)} </p>
                    <p> {review.comment} </p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  {userInfo && (
                    <>
                      {erorProductReview && (
                        <Message variant="danger">
                          {" "}
                          {erorProductReview}{" "}
                        </Message>
                      )}
                      <h2>Write a review</h2>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select....</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Better</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <FormControl
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></FormControl>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    </>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
