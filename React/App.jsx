import React, { Suspense, useState, useEffect, useCallback } from 'react';
import logger from 'sabio-debug';
import { Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './layouts/Default';
import HorizontalLayout from './layouts/Horizontal/';
import NavBar from './pages/landing/NavBar';
import Footer from './pages/landing/Footer';
import usersServices from './services/usersServices';
import userProfileService from './services/userProfilesService';
import { Container } from 'react-bootstrap';
import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from './routes';
import myGa from './components/googleanalytics/myGa';
import messagesService from './services/messagesService';

const DEFAULT_USER = {
    id: 0,
    roles: [],
    email: '',
    isLoggedIn: false,
    profile: {},
    conversations: [],
};

const loading = () => <div className="">loading....</div>;
const _logger = logger.extend('App');
_logger('publicProtectedFlattenRoutes', publicProtectedFlattenRoutes);
_logger('authProtectedFlattenRoutes', authProtectedFlattenRoutes);

export default function App(props) {
    const { pathname, state } = useLocation();
    const [currentUser, setCurrentUser] = useState(DEFAULT_USER);

    useEffect(() => {
        myGa();
    }, [pathname]);

    useEffect(() => {
        if (state?.type === 'USER_LOGIN' && state.currentUser) {
            _logger('loggin in ?');
            setCurrentUser(() => {
                const pd = { ...state.currentUser };
                pd.isLoggedIn = true;
                return pd;
            });
        } else if (state?.type === 'USER_LOGOUT') {
            _logger('App level change logout state firing...');
            setCurrentUser(() => {
                return DEFAULT_USER;
            });
        } else {
            usersServices.getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentFail);
        }
    }, [state]);

    const onGetProfileSuccess = (response) => {
        const userProf = response;
        setCurrentUser((prevState) => {
            let nState = { ...prevState };
            nState.profile = {
                userId: userProf.id,
                firstName: userProf.firstName,
                lastName: userProf.lastName,
                mi: userProf.mi,
                avatarUrl: userProf.avatarUrl,
                dateModified: userProf.dateModified,
                dateCreated: userProf.dateCreated,
            };

            return nState;
        });
    };

    const onGetProfileError = (err) => {
        _logger(err);
    };

    const onGetCurrentSuccess = (res) => {
        const userData = res.data.item;
        setCurrentUser({
            id: userData.id,
            roles: userData.roles,
            email: userData.name,
            isLoggedIn: true,
            profile: {},
            conversations: [],
        });

        userProfileService.getById(2).then(onGetProfileSuccess).catch(onGetProfileError);
        messagesService.getConvo(16).then(onGetConvoSuccess).catch(onGetConvoError);
    };

    const onGetConvoSuccess = (response) => {
        _logger('convos', response);
        setCurrentUser((prevState) => {
            const updatedUser = { ...prevState };
            updatedUser.conversations = response.item;

            return updatedUser;
        });
    };

    const onGetConvoError = (error) => {
        _logger(error);
    };

    const onGetCurrentFail = (err) => {
        _logger(err);
    };

    const [currentPath, setCurrentPath] = useState({
        isPublic: false,
        isSecured: false,
        isUnknown: false,
    });

    const getRouteMapper = useCallback(
        (user) => (routeData) =>
            (
                <Route
                    key={routeData.path}
                    path={routeData.path}
                    exact={routeData.exact}
                    name={routeData.name}
                    element={<routeData.element currentUser={user} />}
                />
            ),
        []
    );

    const getMappedRoutes = useCallback(
        (arrOfRouteData, user) => {
            _logger('getMappedRoutes USER: ', user);
            let theseRoutes = arrOfRouteData.map(getRouteMapper(user));
            _logger('getMappedRoutes.', theseRoutes);
            return theseRoutes;
        },
        [getRouteMapper]
    );

    const currentPathCheck = (pp) => {
        let ppPath = pp.path.split('/').filter((el) => el !== '');
        let pathNameCheck = pathname.split('/').filter((el) => el !== '');
        let result = false;
        if (ppPath.length === pathNameCheck.length) {
            if (pathNameCheck.length === 0) {
                result = true;
            } else {
                for (let a = 0; a < pathNameCheck.length; a++) {
                    if (pathNameCheck[a] !== ppPath[a]) {
                        if (ppPath[a].startsWith(':') && pathNameCheck[a].match(/^[0-9]+$/)) {
                            result = true;
                        } else {
                            return false;
                        }
                    } else {
                        result = true;
                    }
                }
            }
        }
        return result;
    };

    // ensure that currentPath.path is set to true, but only if it is false AND it should be true
    useEffect(() => {
        if (publicProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
            if (!currentPath.isPublic) {
                setCurrentPath(() => {
                    return { isSecured: false, isPublic: true };
                });
            }
        } else if (authProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
            if (!currentPath.isSecured) {
                setCurrentPath(() => {
                    return { isPublic: false, isSecured: true };
                });
            }
        } else if (!currentPath.isUnknown) {
            setCurrentPath(() => {
                return { isUnknown: true };
            });
        }
    }, [pathname, currentPath]);

    const generateDynamicRoutes = (currentUser) => {
        _logger('generateDynamicRoutes', authProtectedFlattenRoutes);
        let routes = authProtectedFlattenRoutes.filter((route) => {
            if (route.roles?.length === 0) {
                return true; //all any loggedIn user to see routes that have empty roles
            } else if (route?.roles) {
                return route.roles?.some((role) => currentUser.roles.includes(role));
            } else {
                return false;
            }
        });
        _logger('generateDynamicRoutes', routes);
        return getMappedRoutes(routes, currentUser);
    };

    const getLast = (arr) => {
        return [arr[arr.length - 1]];
    };

    _logger('render', { pathname, currentUser, currentPath: JSON.stringify(currentPath) });
    return (
        <div>
            <Suspense fallback={loading}>
                {/* if the path is public we do not care about the current User  */}
                {currentPath.isPublic && (
                    <DefaultLayout {...props}>
                        <NavBar currentUser={currentUser} />
                        <Container>
                            <Routes>{getMappedRoutes(publicProtectedFlattenRoutes, currentUser)}</Routes>
                        </Container>
                        <Footer />
                    </DefaultLayout>
                )}

                {/* if the user is logged in and attempting to go to an KNOWN page, that is is also secure/not public  */}
                {currentUser.isLoggedIn && !currentPath.isPublic && !currentPath.isUnknown && (
                    <HorizontalLayout {...props} currentUser={currentUser}>
                        <Routes>{generateDynamicRoutes(currentUser)}</Routes>
                    </HorizontalLayout>
                )}

                {/* we do not know this url , and so the user status does not matter */}
                {currentPath.isUnknown && (
                    <DefaultLayout {...props}>
                        <Routes>{getMappedRoutes(getLast(publicProtectedFlattenRoutes), currentUser)}</Routes>
                    </DefaultLayout>
                )}
            </Suspense>
        </div>
    );
}
