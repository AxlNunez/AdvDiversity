import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import debug from 'sabio-debug';
import { Formik, Field, Form } from 'formik';
import referenceService from '../../services/referenceService';
import usersServices from '../../services/usersServices';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const _logger = debug.extend('ReferenceCard');

function ReferenceCard(props) {
    const navigate = useNavigate();

    const [references, setArrayOfReferences] = useState([]);

    const [show, setShow] = React.useState(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        referenceService.getReferenceTypes().then(onGetReferenceTypesSuccess).catch(onGetReferenceTypesError);
    }, []);
    const submitReference = (values) => {
        const registerSuccess = (props) => {
            let payload = { referenceTypeId: parseInt(values.referenceTypeId), userId: props.item };
            _logger(payload, 'payload');
            referenceService.createReference(payload).then(onCreateReferencesSuccess).catch(onCreateReferencesError);

            swal('Register Success!', 'An email will be sent to confirm your account', 'success');
            _logger('Register Success:', props);
        };
        usersServices.register(props.registerData).then(registerSuccess).catch(registerError);
        return values;
    };

    const registerError = (error) => {
        swal('Oh No!', 'An error occured, please check your email', 'error');
        _logger(error);
    };

    const mapReferences = (aReference) => {
        return (
            <div key={aReference.id} className="p-1">
                <label>
                    <Field
                        name="referenceTypeId"
                        render={({ field }) => (
                            <input
                                {...field}
                                name="referenceTypeId"
                                type="radio"
                                checked={parseInt(field.value) === aReference.id}
                                value={parseInt(aReference.id)}
                            />
                        )}
                        value={aReference.id}
                    />
                    &nbsp;{aReference.name}
                </label>
            </div>
        );
    };

    const onGetReferenceTypesSuccess = (data) => {
        let arrayOfReferences = data.items;
        setArrayOfReferences(() => {
            return arrayOfReferences;
        });
    };

    const onGetReferenceTypesError = (err) => {
        _logger(err);
    };

    const onCreateReferencesSuccess = (response) => {
        _logger(response);
        navigate('/login');
    };

    const onCreateReferencesError = (response) => {
        _logger(response);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} contentlabel="Modal">
            <Modal.Header>
                <Modal.Title>
                    <h2 className="p-3">How did you hear about us?</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        referenceTypeId: '',
                    }}
                    onSubmit={submitReference}
                    enableReinitialize={true}>
                    {() => (
                        <Form>
                            <div className="form-group">{references.map(mapReferences)}</div>
                            <Button type="submit" className="close-button" variant="primary">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}

ReferenceCard.propTypes = {
    registerData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        roleId: PropTypes.string.isRequired,
        userStatusId: PropTypes.number.isRequired,
        isConfirmed: PropTypes.bool.isRequired,
    }),
    // referenceTypeId: PropTypes.string,
    item: PropTypes.number,
};

export default ReferenceCard;
