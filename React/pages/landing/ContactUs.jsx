import React, { useState } from 'react';
import { Form as FForm, Formik, Field, ErrorMessage } from 'formik';
import contactSchema from '../../schema/contactFormSchema';
import { Card, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import emailService from '../../services/emailService';
import debug from 'sabio-debug';

const _logger = debug.extend('ContactUs');

function ContactUs() {
    const [formData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (values, { resetForm }) => {
        emailService.addEmail(values).then(onGetSubmitSuccess).catch(onGetSubmitError);
        _logger('values', values);
        resetForm();
    };

    const onGetSubmitSuccess = (response) => {
        swal('Your contact us form has been successfully submitted!');
        _logger('contact form sent successful', response);
    };

    const onGetSubmitError = (error) => {
        swal('Please fill in all required fields');
        _logger('fill in blanks', error);
    };

    return (
        <React.Fragment>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-10 justify-content-center">
                        <Card>
                            <Card.Body>
                                <h4 className="mb-3 header-title text-center">Contact Us</h4>
                                <Formik
                                    enableReinitializae={true}
                                    initialValues={formData}
                                    onSubmit={handleSubmit}
                                    validationSchema={contactSchema}>
                                    <FForm>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="text">Full Name</Form.Label>
                                            <Field
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter your Name"
                                                className="form-control"
                                            />
                                            <ErrorMessage
                                                name="fullName"
                                                component="div"
                                                color="red"
                                                className="has-error"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="exampleEmail2">Email</Form.Label>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                id="exampleEmail2"
                                                className="form-control"
                                            />
                                            <Form.Text>We will never share your email with anyone else.</Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="text">Subject</Form.Label>
                                            <Field
                                                type="text"
                                                name="subject"
                                                placeholder="Enter Subject"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="subject" component="div" className="has-error" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="text">Message</Form.Label>
                                            <Field
                                                component="textarea"
                                                name="message"
                                                className="form-control"
                                                placeholder="Enter Message"
                                            />
                                            <ErrorMessage name="message" component="div" className="has-error" />
                                        </Form.Group>
                                        <Button
                                            className="d-flex m-auto btn btn-primary text-center"
                                            variant="primary"
                                            type="submit">
                                            Submit
                                        </Button>
                                    </FForm>
                                </Formik>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ContactUs;
