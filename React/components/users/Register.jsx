import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Container, FormGroup, FormLabel } from 'react-bootstrap';
import debug from 'sabio-debug';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import AdvDiversity from '../../assets/images/users/logo-transparent.png';
import { registerSchema } from '../../schema/userFormSchema';
import ReferenceCard from '../sitereferences/ReferenceCard';
import Modal from 'react-modal';

const _logger = debug.extend('registration');

function Register() {
    const [register] = useState({
        formData: {
            email: '',
            password: '',
            confirmPassword: '',
            isConfirmed: false,
            userStatusId: 1,
            roleId: '',
        },
    });

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {
        _logger('Register');
    });

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
                                        <h4 className="text-dark-50 text-center mt-0 fw-bold">{'Sign Up'}</h4>
                                    </div>
                                    <Formik
                                        initialValues={register.formData}
                                        validationSchema={registerSchema}
                                        validateOnChange={true}>
                                        {({ errors, touched, values }) => (
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
                                                </FormGroup>

                                                <FormGroup className="mb-3">
                                                    <FormLabel className="form-label">Confirm Password</FormLabel>
                                                    <Field
                                                        name="confirmPassword"
                                                        placeholder="Enter your Confirm Password"
                                                        type="password"
                                                        className="form-control"
                                                    />
                                                    {touched.confirmPassword && errors.confirmPassword && (
                                                        <div>{errors.confirmPassword}</div>
                                                    )}
                                                    <ErrorMessage name="email" component="div" className="has-error">
                                                        You must enter a confirm password
                                                    </ErrorMessage>
                                                </FormGroup>
                                                <FormGroup className="mb-3">
                                                    <FormLabel htmlFor="roleId" className="form-label">
                                                        Choose A Role
                                                    </FormLabel>
                                                    <Field className="form-select" name="roleId" component="select">
                                                        <option value="">Please Select Role</option>
                                                        <option value="1">Mentee</option>
                                                        <option value="2">Mentor</option>
                                                    </Field>
                                                    {touched.roleId && errors.roleId && <div>{errors.roleId}</div>}
                                                    <ErrorMessage name="roleId" component="div" className="text-danger">
                                                        Must Choose Role
                                                    </ErrorMessage>
                                                </FormGroup>
                                                <div className="form-group mb-3">
                                                    By clicking the <strong>Create account</strong> button below you
                                                    agree to our terms of service and privacy statement.
                                                </div>
                                                <div className="mb-3 mb-0 text-center">
                                                    <Button
                                                        className="btn-dark"
                                                        size="md"
                                                        type="submit"
                                                        onClick={handleOpen}>
                                                        Create Account
                                                    </Button>
                                                    <Modal isOpen={show} onRequestClose={handleClose}>
                                                        <ReferenceCard registerData={values} />
                                                    </Modal>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                            <Link to="/login" className="text-muted float-end">
                                <p>{'Already Have an Account? Sign In'}</p>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Register;
