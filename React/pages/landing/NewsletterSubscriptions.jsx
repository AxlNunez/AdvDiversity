import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import newsletterSubscriptionSchema from '../../schema/newsletterSubscriptionSchema';
import swal from 'sweetalert';
import newsletterSubService from '../../services/newsletterSubService';

const _logger = debug.extend('NewsletterSubscriptions');

function NewsletterSubscriptions() {
    const [subscribe] = useState({
        formData: {
            email: '',
        },
    });

    const handleSubmit = (value, {resetForm}) => {
        _logger('handleSubmit', { value });
        newsletterSubService.addSub(value).then(onSubscribeSuccess).catch(onSubscribeError);
        resetForm();
    };

    const onSubscribeSuccess = () => {
        swal('Welcome to our newsletter!'
        , 'Please keep an eye out for your new subscription which will be arriving monthly to your inbox.'
        , 'success');
    };

    const onSubscribeError = () => {
        swal("We're glad you enjoy our newsletter so much that you want to recieve more than one, but the email entered is already subscribed."
        , 'Enjoy!'
        , 'error');
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className=" row justify-content-center">
                    <div className="col d-flex justify-content-center">
                        <Card className="rounded-0 content-center bg-light" style={ {width: '45%'} }>
                            <Card.Body>
                                <h4 className="text-center">Join our newsletter!</h4>
                                <p className="card-subtitle text-muted text-center">
                                                Subscribe now to get the latest news by email!
                                            </p>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={subscribe.formData}
                                    onSubmit={handleSubmit}
                                    validationSchema={newsletterSubscriptionSchema}
                                    validateOnChange={true}>
                                    <Form>
                                        <div className="form-group mb-3">
                                           
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                id="email"
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <button
                                            type="submit"
                                            className="d-flex m-auto btn btn-primary text-center"
                                            variant="primary">
                                            Subscribe!
                                        </button>
                                    </Form>
                                </Formik>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default NewsletterSubscriptions;
