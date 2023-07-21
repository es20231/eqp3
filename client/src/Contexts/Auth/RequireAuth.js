import { toast } from "react-toastify";
import { useApi } from "../../hooks/UseApi";
import Home from "../../Routes/Home";

export const RequireAuth = ({ children }) => {

  const api = useApi()

  async function apiVerificaSession() {
    console.log("test 1")
    const validateApiToken = await api.IsLogged();
    
  
    if (validateApiToken == 200) {
      
      return true;
    } else {
      
      return false;
    }

  }

  // Redireciona para a página Alerta se o token não for encontrado
  console.log("renderizou Require ")
  // vou utilizar a variavel local por conta do delay de passagem de parâmetro
  if ( apiVerificaSession() ) { //user.token 
    toast.success("Bem-vindo");
    return children;
  } else {
    
    toast.warn("Session não encontrado");
    return <Home />;
  }
};