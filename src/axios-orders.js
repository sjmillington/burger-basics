import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-41c16.firebaseio.com/'
});

export default instance;