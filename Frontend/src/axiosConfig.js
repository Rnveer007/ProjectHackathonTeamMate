import axios from "axios";

const instance = axios.create({
    baseURL: "https://projecthackathonteammate.onrender.com/api",
    withCredentials: true
});


export default instance;