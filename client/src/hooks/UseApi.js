import axios from "axios";
import { toast } from "react-toastify";

const config = {
  withCredentials: true,
  baseURL: "http://localhost:5000",
};

const api = axios.create(config);

const handleError = (error) => {
  console.error(error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const status = error.response.status;
    if (status == 401) {
      console.log("Erro de autenticação.");
    } else {
      console.log("Erro desconhecido.");
    }
    toast.warning(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    toast.warning("Erro de rede");
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.warning("Erro interno");
  }
};

export const useApi = () => ({
  login: async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  IsLogged: async () => {
    try {
      const response = await api.get("/islogged");
      console.log(response);
      return response.status;
    } catch (error) {
      handleError(error);
    }
  },

  logout: async () => {
    try {
      const response = await api.get("/logout");
      return response;
    } catch (error) {
      handleError(error);
    }
  },

  register: async (username, fullname, email, password) => {
    try {
      const response = await api.post("/register", {
        username,
        fullname,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleError(error);
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
      handleError(error);
    }
  },

  importImage: async (filename) => {
    try {
      const response = await api.get("/serve-image/" + filename, { responseType: "blob" });
      if (response.status == 200) {
        // console.log(response.data);
        const imgSrc = URL.createObjectURL(response.data);
        // console.log(imgSrc);
        return imgSrc;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  importListImage: async () => {
    try {
      const response = await api.get("/dashboard");
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },
});


// import axios from "axios";
// import { toast } from "react-toastify";

// const api = axios.create({
//     withCredentials: true,
//     baseURL: "http://localhost:5000"

// });

// export const useApi = () => ({
//     login: async (username, password) => {
//         try {
//             const response = await api.post("/login", { username, password });
//             if (response.status == 200) {
//                 return response;
//             } else if (response.status == 401) {
//                 console.log("Erro de autenticação.");
//                 return response;
//             } else {
//                 console.log("Erro desconhecido.");
//                 return response;
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     },
//     IsLogged: async () => {
//         try {
//             const response = await api.get("/islogged");
//             console.log(response);
//             return response.status

//         }
//         catch (error) {
//             console.error(error);
//         }
//     },

//     logout: async () => {
//         try {
//             const response = await api.get("/logout");
//             // const response = await api.get("/logout");
//             // console.log("response logOut" + response);
//             if (response.status == 200) {
//                 return response;
//             } else {

//                 toast.warning("algo deu errado")
//                 return response
//             }

//         } catch (error) {
//             console.error(error);
//         }
//     },

//     register: async (username, fullname, email, password) => {
//         try {
//             const response = await api.post("/register", { username, fullname, email, password });
//             if (response.status == 200) {
//                 return response.data;
//             } else {

//                 toast.warning("algo deu errado")
//                 return response.data;
//             }

//         } catch (error) {
//             console.error(error);
//         }
//     },



//     uploadImage: async (image) => {
//         try {
//             const response = await api.post("/upload", image, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             return response;
//         } catch (error) {
//             console.error(error);
//         }
//     },

//     importImage: async (filename) => {
//         try {
//             const response = await api.get("/serve-image/" + filename, { responseType: "blob" });
//             // console.log(response)
//             if (response.status == 200) {
//                 const imgSrc = URL.createObjectURL(response.data);
//                 return imgSrc;
//             } else {
//                 return response;
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     },

//     importListImage: async () => {
//         try {
//             const response = await api.get("/dashboard");
//             if (response.status == 200) {
//                 return response;
//             } else {

//                 toast.warning("algo deu errado")
//                 return response
//             }

//         } catch (error) {
//             toast.warning("erro de Api no dashboard")
//         }
//     },
// });



