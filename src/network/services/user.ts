import { apiUrls } from '../../lib/constants';
import { APIManager } from '../core';

const { AUTH_URL } = apiUrls;

export function login(email: string, password: string) {
    const data = { password, email };
    const uri = `${AUTH_URL}/login`;
    return APIManager.post(uri, { data }, false);
}
