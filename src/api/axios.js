import axios from 'axios';

export const flipr = axios.create({
    // baseURL: 'http://flipr-django.herokuapp.com/', 
    baseURL: 'http://localhost:8000/', 
    headers: {
          'Content-Type': 'application/json'
    }
});

const requestHandler = (request, email) => {
    if(email)
        request.headers["id"] = email
    return request;
}

export const initializeInterceptors = (email) => {
    flipr.interceptors.request.use(
          request => requestHandler(request, email)
    );
}