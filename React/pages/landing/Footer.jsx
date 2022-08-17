// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/users/logo-transparent2.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="py-3" style={{ backgroundColor: '#051229' }}>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <img src={logo} alt="" className="logo-dark" height="80" />
                            <p className="text-white mt-4">
                                The Institute to Advance Diversity
                                <br /> provides mentorship opportunities
                                <br /> for individuals from underrepresented
                                <br />
                                communities.
                            </p>

                            <ul className="social-list list-inline mt-3">
                                <li className="list-inline-item text-center">
                                    <Link
                                        to="#"
                                        className="social-list-item border-primary text-primary justifyContentCenter">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to="#" className="social-list-item border-danger text-danger">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to="#" className="social-list-item border-info text-info">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                </li>
                                <li className="list-inline-item text-center">
                                    <Link to="#" className="social-list-item border-secondary text-secondary">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={2} className="mt-3 mt-lg-0">
                            <h5 className="text-light">Company</h5>

                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2">
                                    <a href="/aboutus" className="text-white">
                                        About Us
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Affiliate Programs
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/blogs" className="text-white">
                                        Blog
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Documentation
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/faq" className="text-white">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={2} className="mt-3 mt-lg-0">
                            <h5 className="text-light">Apps</h5>

                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Email
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Social Feed
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Projects
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col lg={2} className="mt-3 mt-lg-0">
                            <h5 className="text-light">Discover</h5>
                            <ul className="list-unstyled ps-0 mb-0 mt-3">
                                <li className="mt-2">
                                    <a href="/cookies" className="text-white">
                                        Cookies
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Help Center
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/landing" className="text-white">
                                        Our Products
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/privacy" className="text-white">
                                        Privacy
                                    </a>
                                </li>
                                <li className="mt-2">
                                    <a href="/resources" className="text-white">
                                        Resources
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mt-1">
                                <p className="text-white mt-4 text-center mb-0">
                                    © 2022 The Institute to Advance Diversity
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default Footer;
