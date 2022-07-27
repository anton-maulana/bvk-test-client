import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import { request } from "./base.service";
import { jsonToQueryString } from "../utils/helper"

export function getAll(params = null) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    let query = '';

    if (!!params) {
        query = jsonToQueryString(params)
    }

    return request({
        url: API_BASE_URL + "/product"+query,
        method: 'GET'
    });
}
