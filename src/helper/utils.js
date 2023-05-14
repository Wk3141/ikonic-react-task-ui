import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;



export const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    if (typeof value !== 'number' && value === '') {
        return true;
    }
    if (value === 'undefined' || value === undefined) {
        return true;
    }
    if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    return false;
};

export const getLoggedUser = () => {
    const user = localStorage.getItem('user_data');
    return user ? JSON.parse(user) : {};
};

export const sendRequest = async (url, data) => {
    const method = data.method || 'post';
    const payload = data.payload || {};
    const headers = data.headers || {};
    let token = payload._token;

    if (isEmpty(token)) {
        const user = getLoggedUser();
        token = user._token || '';

    }

    let axios_config = {
        method: method,
        url: url,
        headers: {
            'x-access-token': token,
            ...headers
        },
        validateStatus: () => true //Always resolve promise on every http status
    };
    if (method == 'get') {
        axios_config['params'] = payload;
    } else {
        axios_config['data'] = payload;
    }
    try {
        const response = await axios(axios_config);
        if (response.status === 401) {
            //User's Token has been expired
            localStorage.removeItem('user_data');
            window.location.href = '/login';
        }
        return response;
    } catch (error) {
        return error;
    }
};

export const successToast = (str) => {
    toast.success(str);
};

export const errorToast = (str) => {
    const text = str.replace('-', '<br/>');
    const textHtml = <span dangerouslySetInnerHTML={{ __html: text }}></span>;
    toast.error(textHtml);
};
