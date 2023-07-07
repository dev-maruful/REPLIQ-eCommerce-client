import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_baseURL}`,
});

const useAxios = () => {
  return API;
};

export default useAxios;
