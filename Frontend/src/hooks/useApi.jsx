import { BASE_URL } from '../config.js';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AXIOS_METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

let localAccessToken = null;

export async function doApiCall(
    method,
    uri,
    onSuccess,
    onFailure = false,
    data = undefined
) {
    try {
        const res = await axios({
            method,
            url: `${BASE_URL}${uri}`,
            data,
            headers: localAccessToken
                ? { authorization: `Bearer ${localAccessToken}` }
                : {}
        });

        onSuccess(res.data);
    } catch (err) {
        console.error(err);
        if (onFailure === false) {
            return;
        }
        onFailure(err?.response?.data?.error, err);
    }
}
export const useApi = (method, uri, postData = undefined, deps = []) => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        (async () => {
            try {
                localAccessToken = await getAccessTokenSilently();
            } catch (err) {
                console.error(err);
            }
        })();
    }, [getAccessTokenSilently]);

    const apiCallCallback = useCallback(
        async apiPostData => {
            setLoading(true);
            await doApiCall(
                method,
                uri,
                responseData => {
                    setData(responseData);
                    setError(false);
                    setLoading(false);
                },
                errorMessage => {
                    setError(errorMessage);
                    setData(false);
                    setLoading(false);
                },
                apiPostData
            );
        },
        [method, uri]
    );

    useEffect(() => {
        apiCallCallback(postData).catch(console.log);
    }, [apiCallCallback, JSON.stringify(postData), ...deps, postData]);

    return { data, loading, error, apiCallCallback };
};
