import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import usersServices from '../../services/usersServices';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    faRightToBracket,
    faRightFromBracket,
    faIdBadge,
    faHandHoldingHeart,
    faUser,
    faUsersGear,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import logo from '../../assets/images/users/logo-transparent2.png';
import debug from 'sabio-debug';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
const _loggerPage = debug.extend('NavBar');

const NavBar = (props) => {
    const navigate = useNavigate();
    const logoutSubmit = () => {
        usersServices.logout().then(logoutSuccess).catch(logoutError);
    };
    const logoutSuccess = (response) => {
        toastr['success']('Logged out');
        _loggerPage(response);
        const state = { type: 'USER_LOGOUT' };
        navigate('/', { state });
    };
    const logoutError = (error) => {
        _loggerPage(error);
    };

    return (
        <>
            <Navbar
                collapseOnSelect
                name="navbar"
                id="navbar"
                fixed="top"
                expand="lg"
                variant="dark"
                className=" header nav-bar-settings">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="" className="logo-dark" height="100" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav">
                        <GiHamburgerMenu />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav" className="col-auto mx-auto">
                        <Nav as="ul" className="col-auto mx-auto">
                            <h4>
                                <NavDropdown
                                    title="Mentorship Program"
                                    id="collapsible-nav-dropdown"
                                    renderMenuOnMount={true}>
                                    <NavDropdown.Item href="/mentors" className="nav-item-settings">
                                        Mentors
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/resources" className="nav-item-settings">
                                        Resources
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/becomeamentor" className="nav-item-settings">
                                        Become a Mentor
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/sharestory" className="nav-item-settings">
                                        Share Your Story
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </h4>
                            <div className="vertical-line"></div>
                            <h4>
                                <NavDropdown title="Impact" id="collapsible-nav-dropdown" renderMenuOnMount={true}>
                                    <NavDropdown.Item href="/mentors" className="nav-item-settings">
                                        Mentors
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/landing" className="nav-item-settings">
                                        Metrics
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/landing" className="nav-item-settings">
                                        Mentee Stories
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </h4>
                            <div className="vertical-line"></div>
                            <h4>
                                <NavDropdown
                                    title="Who's Hiring?"
                                    id="collapsible-nav-dropdown"
                                    renderMenuOnMount={true}>
                                    <NavDropdown.Item href="/jobs" className="nav-item-settings">
                                        Job Postings
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/jobfairs" className="nav-item-settings">
                                        Jobfair Postings
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </h4>
                            <div className="vertical-line"></div>
                            <h4>
                                <NavDropdown title="News" id="collapsible-nav-dropdown" renderMenuOnMount={true}>
                                    <NavDropdown.Item href="/events" className="nav-item-settings">
                                        Events
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/blogs" className="nav-item-settings">
                                        Blog
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </h4>
                            <div className="vertical-line"></div>
                            <h4>
                                <NavDropdown title="About Us" id="collapsible-nav-dropdown" renderMenuOnMount={true}>
                                    <NavDropdown.Item href="/aboutus" className="nav-item-settings">
                                        About Us
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/searchorganizations" className="nav-item-settings">
                                        Our Current Partners
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/landing" className="nav-item-settings">
                                        Our Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/faq" className="nav-item-settings">
                                        FAQ
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </h4>
                        </Nav>
                        <Nav className="justify-content-between align-items-center">
                            <Nav.Item className="justify-content-between">
                                {props.currentUser?.roles.indexOf('Admin') > -1 ? (
                                    <Link
                                        to="/dashboard/analytics"
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faUsersGear} />
                                        &nbsp;&nbsp; Dashboard
                                    </Link>
                                ) : props.currentUser?.roles.indexOf('Mentor') > -1 ? (
                                    <Link
                                        to="/dashboard/mentor"
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faUserTie} />
                                        &nbsp;&nbsp; Dashboard
                                    </Link>
                                ) : props.currentUser?.roles.indexOf('Mentee') > -1 ? (
                                    <Link
                                        to="/dashboard/mentee"
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faUser} />
                                        &nbsp;&nbsp; Dashboard
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                {!props.currentUser.isLoggedIn && (
                                    <Link
                                        to="/register"
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faIdBadge} />
                                        &nbsp;&nbsp;Register
                                    </Link>
                                )}
                                &nbsp; &nbsp;
                                {props.currentUser.isLoggedIn ? (
                                    <Link
                                        to="{onClick}"
                                        onClick={logoutSubmit}
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        &nbsp;&nbsp; LogOut
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                        &nbsp;&nbsp; LogIn
                                    </Link>
                                )}
                                &nbsp;&nbsp;
                                <Link
                                    to={'/donate'}
                                    className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                    <FontAwesomeIcon icon={faHandHoldingHeart} />
                                    &nbsp;&nbsp; Donate
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

NavBar.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
};
export default NavBar;
