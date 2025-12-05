import axios from "axios";

const API_URL = "http://localhost:8080/flight-instances"

export const getAllFlightInstances = () => {
    return axios.get(API_URL)
}