import axios from "axios";
import { useAuthStore } from "../stores";

const TesloApi = axios.create({
  baseURL: "http://localhost:3000/api"
})


TesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  console.log({token});

  if(token) {
    config.headers["Authorization"] = `Bearer ${ token }`;
  }

  return config;

})

export default TesloApi;