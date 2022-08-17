import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Container, FormGroup, FormLabel } from 'react-bootstrap';
import debug from 'sabio-debug';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import usersServices from '../../services/usersServices';
import profileService from '../../services/mentorProfileService';
import AdvDiversity from '../../assets/images/users/logo-transparent.png';
import { loginSchema } from '../../schema/userFormSchema';

const _logger = debug.extend('Login');

function Login() {
    const [login] = useState({
        formData: {
            email: '',
            password: '',
        },
    });

    const navigate = useNavigate();

    const handleSubmit = (values) => {
        _logger('handleSubmit', { values });
        usersServices.login(values).then(usersServices.getCurrent).then(loginSuccess).catch(loginError);
    };

    const loginSuccess = (response) => {
        toastr['success']('Logged In.');
        const userCurrent = response.data.item;
        const state = { type: 'USER_LOGIN', currentUser: response.data.item };
        _logger('Login Success:', userCurrent.roles);

        if (userCurrent.roles.includes('Admin')) {
            navigate('/dashboard/analytics', { state });
        } else if (userCurrent.roles.includes('Mentor')) {
            profileService
                .getMentorProfile()
                .then(() => navigate('/dashboard/mentor', { state }))
                .catch(() => navigate(`/mentors/profile/new`, { state }));
        } else if (userCurrent.roles.includes('Mentee')) {
            navigate('/dashboard/mentee', { state });
        } else {
            navigate('/dashboard/profiles', { state });
        }
    };

    const loginError = (error) => {
        toastr['error']('There was a problem, check email and password');
        _logger(error);
    };

    return (
        <>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                <Card.Header className="pt-1 pb-0 text-center bg-dark">
                                    <Link to="/">
                                        <span>
                                            <img src={AdvDiversity} alt="Advancing Diversity" height="150" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center mt-0 fw-bold">{'Sign In'}</h4>
                                    </div>
                                    <Formik
                                        initialValues={login.formData}
                                        validationSchema={loginSchema}
                                        validateOnChange={true}
                                        onSubmit={handleSubmit}>
                                        {({ errors, touched }) => (
                                            <Form>
                                                <FormGroup className="mb-3">
                                                    <FormLabel className="form-label">Email Address</FormLabel>
                                                    <Field
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        type="email"
                                                        className="form-control"
                                                    />
                                                    {touched.email && errors.email && <div>{errors.email}</div>}
                                                    <ErrorMessage name="email" component="div" className="has-error">
                                                        You must enter a valid email
                                                    </ErrorMessage>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <FormLabel className="form-label">Password</FormLabel>
                                                    <Field
                                                        name="password"
                                                        placeholder="Enter your Password"
                                                        type="password"
                                                        className="form-control"
                                                    />

                                                    {touched.password && errors.password && (
                                                        <div>{errors.password}</div>
                                                    )}
                                                    <ErrorMessage name="email" component="div" className="has-error">
                                                        You must enter a valid password
                                                    </ErrorMessage>
                                                    <Link to="/forgotpassword" className="text-muted float-end">
                                                        <small>{'Forgot your password?'}</small>
                                                    </Link>
                                                </FormGroup>

                                                <FormGroup className="mb-3 mb-0 text-center">
                                                    <Button className="btn-dark" size="md" type="submit">
                                                        Login Account
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                            <Link to="/register" className="text-muted float-end">
                                <p>{'Dont Have An Account? Sign Up'}</p>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
export default Login;
