import axios from 'axios';
import * as helper from '../services/serviceHelpers';

const endpoint = `${helper.API_HOST_PREFIX}/api/sitereferences`;

const referenceService = {};

referenceService.createReference = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

referenceService.getReferences = () => {
    const config = {
        method: 'GET',
        url: endpoint,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

referenceService.getReferenceTypes = () => {
    const config = {
        method: 'GET',
        url: endpoint + '/references',
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

export default referenceService;
