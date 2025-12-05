import axios from 'axios';

const API_URL = "http://localhost:8080/flights";

export const getAllFlights = () => {
    return axios.get(API_URL)
}

