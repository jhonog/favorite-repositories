import axios from "axios";

// Conection to gitHub API using axios
export const gitHubApi = axios.create({
    baseURL: "https://api.github.com/users/",
});
