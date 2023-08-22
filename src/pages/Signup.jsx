import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users", data)
      .then((res) => {
        navigate("/login")})
        alert('Usuario registrado exitosamente')
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Algo salio mal");
        } else {
          alert(error.response?.status);
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit(submit)} className="form-father-signup">
      <p className="welcome-form">Welcome! Enter your data</p>
      {/* <div className="inputs-btn-login"> */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First name:</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter your name"
          {...register("firstName")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last name:</Form.Label>
        <Form.Control
          type="lastname"
          placeholder="Enter your last name"
          {...register("lastName")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="phone"
          placeholder="Enter your phone number"
          {...register("phone")}
        />
      </Form.Group>
      <div className="signup-buttons">
        <Button variant="primary" type="submit" className="btn-submit">
          Submit
        </Button>
        <Button
          variant="primary"
          type="button"
          className="btn-submit"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
      </div>
      {/* </div> */}
    </Form>
  );
};

export default Signup;
