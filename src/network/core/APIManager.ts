import axios, { ResponseType } from 'axios';
import { authHelper } from '../../lib/helpers';

interface IRequestConfig {
    params?: any;
    data?: any;
    responseType?: ResponseType;
}

enum RequestType {
    GET,
    POST,
    PUT,
    DELETE,
}

// createFormData is a recursive func, that detect any File object in our long struct and attach that file on 'files'(that will be catch by filepond, nest(using interceptors)), at the same time our object with data mantain the same struct.
function createFormData(object: any, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();

    for (let property in object) {
        if (!object.hasOwnProperty(property)) continue;

        const formKey = namespace ? `${namespace}[${property}]` : property;

        if (object[property] instanceof Date) formData.append(formKey, object[property].toString());
        else if (typeof object[property] === 'object' && !(object[property] instanceof File))
            createFormData(object[property], formData, formKey);
        else if (object[property] instanceof File) formData.append('files', object[property]);
        else formData.append(formKey, object[property]);
    }

    return formData;
}

export const APIManager = {
    async get<T = any>(url: string, config: IRequestConfig = {}, tokenRequired = true) {
        const { params, responseType } = config;
        const headers = await getHeaders(RequestType.GET, tokenRequired);
        return axios.get<T>(url, { params, headers, responseType });
    },

    async post<T = any>(url: string, config: IRequestConfig = {}, tokenRequired = true) {
        const { params, data, responseType } = config;
        const headers = await getHeaders(RequestType.POST, tokenRequired);
        return axios.post<T>(url, data, { params, headers, responseType });
    },

    async put<T = any>(url: string, config: IRequestConfig = {}) {
        const { params, data, responseType } = config;
        const headers = await getHeaders(RequestType.PUT);
        return axios.put<T>(url, data, { params, headers, responseType });
    },

    async delete<T = any>(url: string, config: IRequestConfig = {}) {
        const { params, responseType } = config;
        const headers = await getHeaders(RequestType.DELETE);
        return axios.delete<T>(url, { params, headers, responseType });
    },

    async postWithFiles<T = any>(url: string, config: IRequestConfig) {
        const { params, data } = config,
            headers = await getHeaders(RequestType.POST);

        return axios.post<T>(url, createFormData(data), { params, headers });
    },

    async putWithFiles<T = any>(url: string, config: IRequestConfig) {
        const { params, data } = config,
            headers = await getHeaders(RequestType.PUT);

        return axios.put<T>(url, createFormData(data), { params, headers });
    },
};

async function getHeaders(type: RequestType, tokenRequired = true): Promise<any> {
    const defaults = { Accept: 'application/json' };
    if (type !== RequestType.GET) defaults['Content-type'] = 'application/json';
    if (tokenRequired === true) {
        const token = authHelper.getAuthorizationToken();
        defaults['Authorization'] = token;
    }
    return defaults;
}
