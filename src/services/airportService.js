import axios from "axios";

const API_URL = "http://localhost:8080/airports"; // your GET api endpoint

export const getAllAirports = () => {
    return axios.get(API_URL);
};
