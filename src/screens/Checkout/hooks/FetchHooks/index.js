import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://server.seafreshing.com';

const FetchHooks = ({
    url,
    method = 'get',
    headers = undefined,
    callback = () => { },
    body,
}) => {
    const [data, setData] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios({
                    url,
                    method,
                    baseURL: BASE_URL,
                    data: body,
                    headers,
                    cancelToken: source.token,
                });
                if (isMounted) {
                    setData(response.data);
                    callback(response);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 2000);
            }
        };

        fetchData(url);

        const cleanUp = () => {
            console.log('Cleanup');
            isMounted = false;
            source.cancel();
        };
        return cleanUp;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, fetchError, isLoading };
};

export default FetchHooks;
