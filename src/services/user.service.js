import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import { request } from "./base.service";


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function updateProfiles(body) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    let headers = new Headers();

    return request({
        url: API_BASE_URL + "/user/update-profile",
        method: 'POST',
        body: body
    }, headers);
}