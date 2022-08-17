import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const usersServices = {
    endpoint: `${API_HOST_PREFIX}/api/users`,
};

usersServices.changePassword = (payload) => {
    const config = {
        method: 'PUT',
        url: `${usersServices.endpoint}/changepassword`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

usersServices.forgotPassword = (payload) => {
    const config = {
        method: 'PUT',
        url: `${usersServices.endpoint}/forgotpassword`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

usersServices.register = (payload) => {
    const config = {
        method: 'POST',
        url: `${usersServices.endpoint}/register`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

usersServices.login = (payload) => {
    const config = {
        method: 'POST',
        url: `${usersServices.endpoint}/login`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

usersServices.getCurrent = () => {
    const config = {
        method: 'GET',
        url: `${usersServices.endpoint}/current`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

usersServices.getUserById = (id) => {
    const config = {
        method: 'GET',
        url: `${usersServices.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

usersServices.logout = () => {
    const config = {
        method: 'GET',
        url: `${usersServices.endpoint}/logout`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

usersServices.getStatistics = () => {
    const config = {
        method: 'GET',
        url: usersServices.endpoint + '/statistics',
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess);
};

export default usersServices;
