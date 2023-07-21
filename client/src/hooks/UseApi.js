import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000"

    // baseURL: process.env.REACT_APP_API_URL
    // o .env n deixa enviar as withCredentials 
});

//  configure({ api })
export const useApi = () => ({
    login: async (username, password) => {
        try {
            // const response = await api.post("/login", { username, password });
            const response = await api.post("/login", { username, password });
            if (response.status == 200) {
                // console.log("Login bem-sucedido!");
                // console.log(response.data);
                return response;
            } else if (response.status == 401) {
                console.log("Erro de autenticação.");
                return response;
            } else {
                console.log("Erro desconhecido.");
                return response;
            }
        } catch (error) {
            console.error(error);
        }
    },

    logout: async () => {
        try {
            const response = await api.get("/logout");
            // const response = await api.get("/logout");
            // console.log("response logOut" + response);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    register: async (name, fullname, email, password) => {
        try {
            console.log(name + fullname + email + password)
            const response = await api.post("/register", { name, fullname, email, password });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    validateToken: async (email) => {
        try {
            const response = await api.post("/validateToken", { email });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    uploadImage: async (image) => {
        try {
            const response = await api.post("/upload", image, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    importImage: async (filename) => {
        try {
            const response = await api.get("/serve-image/"+filename,{ responseType: "blob" });
            console.log(response)
            const imgSrc = URL.createObjectURL(response.data);
            return imgSrc;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    importListImage: async () => {
        try {
            const response = await api.get("/dashboard");
            // const imgSrc = URL.createObjectURL(response.data);
            // return imgSrc;
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    deleteImage : async()=>{
        try{
            const response = await api.delete("");

            return response;
        }
        catch(error){
            console.error(error);
        }

    }
});



