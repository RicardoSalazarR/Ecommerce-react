import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
      .then((res) => {
        navigate("/");
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Credenciales incorrectas");
        } else {
          alert(error.response?.status);
        }
      });
  };
  return (
    <div className="form-father">
      <Form onSubmit={handleSubmit(submit)} className="form-input">
        <p className="welcome-form">
          Welcome! Enter your email and password to continue
        </p>
        <div className="prueba-data-container">
          <h5>Test data</h5>
          <span>john@gmail.com</span>
          <span>john1234</span>
        </div>
        <div className="inputs-btn-login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
          <Button variant="primary" type="submit" className="btn-submit">
            Submit
          </Button>
          <p>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")} style={{cursor:'pointer'}}>Sign up</a>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
