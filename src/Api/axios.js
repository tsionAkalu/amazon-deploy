import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firebase functions
    // baseURL: "http://127.0.0.1:5001/clone-6789b/us-central1/api",
  
    // deployed version of firebase function
    // baseURL: "http://127.0.0.1:5001/clone-6789b/us-central1/api/",
  
    // deployed version of amazon server on render 
    // baseURL: "https://amazon-api-deploy-ohd9.onrender.com/"
    // baseURL: "http://localhost:3001"
    baseURL: "https://amazon-api-deploy-2gln.onrender.com/"
  });
  
  export { axiosInstance };