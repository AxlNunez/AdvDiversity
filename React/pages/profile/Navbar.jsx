import React from 'react';
import { Collapse, Navbar as ReactNav, Container, Row } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppMenu from './Menu';
import { getMenuItems } from '../../helpers/menu';
import logger from 'sabio-debug';
import logo from '../../assets/images/users/logo-transparent2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../services/usersServices';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './navbar.css';

const Navbar = (props) => {
    const inputTheme = 'dark';

    const _logger = logger.extend('Navbar');

    const navigate = useNavigate();

    const filterItemsByRoles = (menuItems, user) => {
        return menuItems.filter((item) => {
            if (item.roles) {
                return item?.roles.some((role) => user.roles.includes(role));
            }
            return true;
        });
    };

    const filterMenuItems = (menuItems, user) => {
        const parentItems = filterItemsByRoles(menuItems, user);

        return parentItems.map((item) => {
            if (item.children) {
                let filteredChildren = filterItemsByRoles(item.children, user);
                return {
                    ...item,
                    children: filteredChildren,
                };
            }
            return item;
        });
    };

    const onLogOut = () => {
        userService.logout().then(onLogoutSuccess).catch(onLogoutError);
    };

    const onLogoutSuccess = () => {
        toastr['success']('Logged Out.');
        const state = { type: 'USER_LOGOUT' };
        navigate('/', { state });
    };

    const onLogoutError = (error) => {
        toastr['error']('There was a problem logging out.');
        _logger(error);
    };

    return (
        <React.Fragment>
            <div className="topnav py-sm-1" height="20px" style={{ backgroundColor: '#051229' }}>
                <div>
                    <h4>
                        <nav
                            className={classNames(
                                'navbar',
                                'navbar-expand-lg',
                                'topnav-menu',
                                'navbar-',
                                'nav-font',
                                +inputTheme
                            )}>
                            <Container className="mt-1 mb-1 d-flex align-items-center w-100">
                                <Row className="align-items-center justify-content-around">
                                    <div className="col-auto">
                                        <ReactNav.Brand href="/">
                                            <img src={logo} alt="" className="logo-dark" height="100" />
                                        </ReactNav.Brand>
                                    </div>
                                    <div className="col">
                                        <Collapse
                                            in={props.isMenuOpened}
                                            className="navbar-collapse"
                                            id="topnav-menu-content">
                                            <div>
                                                <AppMenu
                                                    className="dropndown-menu"
                                                    menuItems={filterMenuItems(getMenuItems(), props.currentUser)}
                                                />
                                            </div>
                                        </Collapse>
                                    </div>
                                </Row>
                                <div className="">
                                    <Link
                                        onClick={onLogOut}
                                        to="#"
                                        className="how-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        &nbsp;&nbsp; Logout
                                    </Link>
                                    &nbsp;&nbsp;
                                    <Link
                                        to={'/donate'}
                                        className="show-mobile btn btn-sm btn-dark btn-rounded btn-outline-light">
                                        <FontAwesomeIcon icon={faHandHoldingHeart} />
                                        &nbsp;&nbsp; Donate
                                    </Link>
                                </div>
                            </Container>
                        </nav>
                    </h4>
                </div>
            </div>
        </React.Fragment>
    );
};

Navbar.propTypes = {
    isMenuOpened: PropTypes.bool,
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
};
export default Navbar;
