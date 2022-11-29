import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submit = (data) => {
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login',data)
        .then(res=>{
            navigate("/")
            console.log(res.data.data.token)
            localStorage.setItem("token", res.data.data.token)

        })
        .catch(error=>{
            if(error.response?.status===404){
                alert("Credenciales incorrectas")
            }else{
                alert(error.response?.status)
            }
        })
    };
    return (
        <Form onSubmit={handleSubmit(submit)}>
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
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Login;