import axios from "axios";
import { toast, useProgress } from "react-toastify";


const config = {
  withCredentials: true,
  baseURL: "http://localhost:5000",
};

const api = axios.create(config);

// options upload progress


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

  dataUser: async () => {
    try {
      const response = await api.get("/userdata");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  editUserName: async (new_username) => {
    try {
      const response = await api.post("/change_username", { new_username });
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  editFullName: async (new_fullname) => {
    try {
      const response = await api.post("/change_fullname", { new_fullname });
      return response;
    } catch (error) {
      handleError(error);
    }
  },

  editDescription: async (new_description) => {
    try {
      const response = await api.post("/change_description", { new_description });
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  editEmail: async (new_email) => {
    try {
      const response = await api.post("/change_email", { new_email });
      return response;
    } catch (error) {
      handleError(error);
    }
  },
  uploadImageProfile: async (image) => {
    try {
      const response = await api.post("/set-profile-picture", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      handleError(error);
    }
  },

  importImageProfile: async () => {
    try {
      const response = await api.get("/serve-profile-picture", { responseType: "blob" });
      if (response.status == 200) {
        // console.log(response.data);
        // return response.data
        
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
      const response = await api.post('/upload', image,

        {
          headers: {
            // 'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
          },
          // onUploadProgress: (progressEvent) => {
          //   const { loaded, total } = progressEvent;
          //   const percent = Math.floor((loaded * 100) / total);
          //   console.log(`${loaded} bytes uploaded | ${percent}%`);
          // },
        },
      );
     
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
  deleteImage: async (filename) => {
    try {
      const response = await api.get("/delete-image/" + filename);
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  postImage: async (filename, description) => {
    try {
      const response = await api.post("/post/" + filename, { description: description });
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  importListTimelineImage: async (userName) => {
    try {
      const response = await api.get("/timeline/" + userName);
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },
  ListTimelineUsers: async () => {
    try {
      const response = await api.get("/users");
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },
  DeletePostTimeline: async (idPost) => {
    try {
      const response = await api.get("/delete-post/" + idPost );
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },
  ImportDataUserProfile: async (username) => {
    try {
      const response = await api.get("/user/"  + username);
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  //likes e comentários
  ImportLikesImage: async (post_id) => {
    try {

      const response = await api.get("/get_post_likes/" + post_id  );
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  ImportCommentsImage: async (comment_id_) => {
    try {
      var comment_id = JSON.stringify(comment_id_);

      
      const response = await api.get("/get_comment_likes" , {comment_id} );
      if (response.status == 200) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      handleError(error);
    }
  },

  setLikesImage: async (data) => {
    try {
      /* 
      tipo: 1 / 0
      author_id:
      post_id:
      */
      const response = await api.post("/like_post" , data );
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

