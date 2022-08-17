import React, { useState } from 'react';
import { Row, Carousel, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import debug from 'sabio-debug';
import Industries from './Industries';
import ContactUs from './ContactUs';
import NewsletterSubscriptions from './NewsletterSubscriptions';
import carousel1 from '../../assets/images/landing/carousel-1.jpg';
import carousel2 from '../../assets/images/landing/carousel-2.jpg';
import carousel3 from '../../assets/images/landing/carousel-3.jpg';
import contactImage from '../../assets/images/landing/hero-contact.jpg';
import donateImage from '../../assets/images/landing/hero-donate.jpg';
import eventImage from '../../assets/images/landing/hero-event.jpg';
import jobsImage from '../../assets/images/landing/hero-jobs.jpg';
import newsImage from '../../assets/images/landing/hero-news.jpg';
import resourcesImage from '../../assets/images/landing/hero-resources.jpg';

import { industries } from './Data';

import './hero.css';
import Footer from './Footer';

const _loggerPage = debug.extend('Landing Hero');

const Hero = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        _loggerPage(e);
        setIndex(selectedIndex);
    };

    return (
        <div className="hero-page fill-window">
            <Row>
                <Col className="hero-column">
                    <Card className="hero-card">
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img className="d-block w-100 hero-image" src={carousel1} alt="First slide" />
                                <Carousel.Caption className="d-flex text-center flex-column justify-content-center align-items-center">
                                    <h3>Our mission to mentees</h3>
                                    <Card className="hero-carousel-card">
                                        <h4>
                                            We strive to provide all youth, regardless of their background, unparalleled
                                            mentorship with our expansive network of mentors.
                                        </h4>
                                    </Card>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 hero-image" src={carousel2} alt="Second slide" />
                                <Carousel.Caption className="d-flex text-center flex-column justify-content-center align-items-center">
                                    <h3>Mentorship for all backgrounds</h3>
                                    <Card className="hero-carousel-card">
                                        <h4>
                                            We support a wide array of types of mentorship that future mentors can
                                            choose to embody with the help of our resources.
                                        </h4>
                                    </Card>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100 hero-image" src={carousel3} alt="Third slide" />
                                <Carousel.Caption className="d-flex text-center flex-column justify-content-center align-items-center">
                                    <h3>Services catered to career development</h3>
                                    <Card className="hero-carousel-card">
                                        <h4>
                                            Through our match-making services among many other features, mentors and
                                            mentees can attend their sessions in a productive and professional
                                            environment.
                                        </h4>
                                    </Card>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </Card>
                </Col>
            </Row>
            <Industries industries={industries} />
            <Row>
                <Col sm={6} className="hero-column">
                    <div className="hero-info">
                        <img src={eventImage} className="hero-info-image" alt="event" />
                        <div className="hero-event"></div>
                        <div className="hero-text">
                            <h1>EVENTS</h1>
                            <hr />
                            <h3>Participate in our events to engage with our community.</h3>
                            <Link to="/events" className="btn hero-button">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col sm={6} className="hero-column">
                    <div className="hero-info">
                        <img src={donateImage} className="hero-info-image" alt="donate" />
                        <div className="hero-donate"></div>

                        <div className="hero-text">
                            <h1>DONATE</h1>
                            <hr />
                            <h3>
                                Appreciate our work? All members and guests are welcome to donate to our organization to
                                help with our services.
                            </h3>
                            <Link to="/donate" className="btn hero-button">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="hero-column">
                    <div className="hero-info">
                        <img src={jobsImage} className="hero-info-image" alt="jobs" />
                        <div className="hero-jobs"></div>
                        <div className="hero-text">
                            <h1>JOBS</h1>
                            <hr />
                            <h3>Find career opportunities that align with your interests and goals.</h3>
                            <Link to="/jobs" className="btn hero-button">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col sm={6} className="hero-column">
                    <div className="hero-info">
                        <img src={resourcesImage} className="hero-info-image" alt="resources" />
                        <div className="hero-resources"></div>
                        <div className="hero-text">
                            <h1>RESOURCES</h1>
                            <hr />
                            <h3>Discover various resources catered towards our ever-expanding community.</h3>
                            <Link to="/resources" className="btn hero-button">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="hero-column d-flex justify-content-center align-items-center">
                <img src={newsImage} className="hero-info-image-two" alt="newsletter" />
                <div className="hero-newsletter"></div>
                <div style={{ position: 'absolute' }}>
                    <Row className="hero-column text-center hero-text-two">
                        <h1>SUBSCRIBE</h1>
                        <h3>Interested in our activities? Sign up today for our monthly newsletters!</h3>
                        <p className="my-3" />
                    </Row>
                    <Row>
                        <NewsletterSubscriptions />
                    </Row>
                </div>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <img src={contactImage} className="hero-info-image-two" alt="contact" />
                <div className="hero-contactus"></div>
                <div style={{ position: 'absolute' }}>
                    <Row>
                        <Col sm={6} className="hero-column text-center hero-text-two">
                            <h1>CONTACT US</h1>
                            <h3>
                                Feel free to contact us using the form to the right with any questions you may have
                                about our organization. We will work to respond to your email as soon as possible.
                            </h3>
                        </Col>
                        <Col sm={6} className="hero-column">
                            <ContactUs />
                        </Col>
                    </Row>
                </div>
            </Row>
            <Footer />
        </div>
    );
};

export default Hero;
