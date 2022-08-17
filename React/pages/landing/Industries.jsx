// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './industries.css';

const Industries = ({ industries }) => {
    return (
        <>
            <section className="industries-section">
                <Row>
                    <Col>
                        <div className="text-center">
                            <h3>
                                We provide <span className="text-primary">mentorship</span> in the following{' '}
                                <span className="text-primary">industries:</span>
                            </h3>
                        </div>
                    </Col>
                </Row>
                <Row className="industries-row">
                    {industries.map((item, index) => {
                        return (
                            <Col lg={4} key={index} className="text-center">
                                <h2 className="mt-3 mb-3">{item.industry.toUpperCase()}</h2>
                                <div className="demo-box text-center p-2">
                                    <img src={item.image} alt="" className="img-fluid rounded industries-image" />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </section>
        </>
    );
};
Industries.propTypes = {
    industries: PropTypes.arrayOf(PropTypes.shape({})),
};
export default Industries;
