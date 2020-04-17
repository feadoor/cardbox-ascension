import { useState } from 'react';

export type AsyncRequest<T, R, E> = {
    doRequest: (data: T) => Promise<void>,
    result: R | undefined,
    error: E | boolean | undefined,
    inProgress: boolean,
    isComplete: boolean,
};

const useAsyncRequest = <T, R, E> (request: (data: T) => Promise<R>): AsyncRequest<T, R, E> => {

    const [result, setResult] = useState<R | undefined>(undefined);
    const [error, setError] = useState<E | boolean | undefined>(undefined);
    const [inProgress, setInProgress] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const doRequest = (data: T) => {
        setInProgress(true); setIsComplete(false); setResult(undefined); setError(undefined);
        return request(data)
            .then(result => {
                setResult(result);
                setInProgress(false);
                setIsComplete(true);
            })
            .catch((error: E) => {
                setError(error === undefined ? true : error);
                setInProgress(false);
            });
    };

    return { doRequest, result, error, inProgress, isComplete }
}

export default useAsyncRequest;
