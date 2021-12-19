import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { userRegister } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandeler = (e) => {
    e.preventDefault();
    const dataSent = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(dataSent);
    dispatch(userRegister(dataSent));
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {/* {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />} */}
      <Form onSubmit={submitHandeler}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?
          <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
