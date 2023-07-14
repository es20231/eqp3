import axios from "axios";

// axios.defaults.withCredentials = true

const api = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});


export const useApi = () => ({ //Retorna um objeto com funções 
    // validateToken: async (token:string ) => {
    //     // validar o token
    //    const response = await api.post('/validate',{token});
    //    return response.data; 
    // },
    login: async (userName, password) => {
        const data = {
            username: userName,
            password: password
        }
        // const response = await api.post('/login', data);
        try {
            // const response = await axios.post('/login', data);
            const response = await api.post('/login', data);

            if (response.status == 200) {
                // console.log('Login bem-sucedido!');
                // console.log(response.data);

                return response;
                // Lógica adicional para lidar com o login bem-sucedido
            } else if (response.status == 401) {
                console.log('Erro de autenticação.');

                return response;
                // Lógica adicional para lidar com erro de autenticação
            } else {
                console.log('Erro desconhecido.');

                return response;
                // Lógica adicional para lidar com outros erros
            }
        } catch (error) {
            console.error(error);

        }

        // return response.data;
    },

    logout: async () => {
        // const response = await axios.get('/logout')
        const response = await api.get('/logout');
        console.log("response logOut" + response);
        return response;
    },

    Register: async (name, _fullname, email, password) => {
        const data = {
            username: name,
            fullname: _fullname,
            email: email,
            password: password
        }
        //Teste
        // const response = 'ok';
        // return response;
        console.log(data);
        const response = await api.post('/register', data);
        return response.data;

        // tratar resposta de email e user name ja cadastrado
    },

    ValidateToken: async (_email, _token) => {
        const data = {
            email: _email,
            // token: _token
        }
        const response = await api.post('/validateToken', data);

        //espero um boolean
        return response.data;
    },
    //IMAGEM

    UploadImage: async (_image, token) => {
        // const data = {
        //     file: _image,
        //     user_id: token
        // }
        console.log(_image)
        const response = await api.post('/upload', _image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        //espero um boolean
        return response.data;
    },

    ImportImage: async () => {
        // const data = {
        //     file: _image,
        //     user_id: token
        // }
        console.log("teste de import image")
        const response = await api.get('/serve-image/mine_ead.jpg');
        //espero um boolean
        return response.data;
    },
    ImportListImage: async () => {
        // const data = {
        //     file: _image,
        //     user_id: token
        // }
        console.log("teste de import image")
        const response = await api.get('/dashboard');
        //espero um boolean
        return response.data;
    }





})

