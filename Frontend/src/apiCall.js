import { BASE_URL } from './config.js';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AXIOS_METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};
export async function doApiCall(method, uri, data = undefined) {
    let localAccessToken = localStorage.getItem('accessToken');

    const res = await axios({
        method,
        url: `${BASE_URL}${uri}`,
        data,
        headers: localAccessToken
            ? { authorization: `Bearer ${localAccessToken}` }
            : {}
    });

    return res.data;
}
