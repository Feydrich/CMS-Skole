import axios, { AxiosResponse } from 'axios';

axios.interceptors.request.use((config) => {
	
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
	if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
	
    return config;
});


const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
	get: (url: string, params?: any) => { return axios.get(url, params && params).then(responseBody) },
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
};
