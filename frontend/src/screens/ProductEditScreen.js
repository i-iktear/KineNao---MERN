import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                id="image-file"
                label="choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
