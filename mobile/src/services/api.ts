import axios, { AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthTokenGet } from "@storage/storageAuthToken";

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: () => void) => () => void;
};

const api = axios.create({
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

// função para lidar com o gerenciamento do token, recebendo a função de signOut que vai ser passada e usada no AuthContext.
api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    // verificação se a requisição não é autorizada (erro 401 == status code não autorizado). Indício de que o erro é relacionado ao token.
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === "token.expired" || requestError.response.data?.message === "token.invalid") {
        const { refresh_token } = await storageAuthTokenGet();

        if (!refresh_token) {
          signOut();
          
          return Promise.reject(requestError);
        };
      };

      // se o problema não está relacionado a um token expirado ou inválido, desloga o usuário para ele começar o fluxo de autenticação novamente.
      signOut();
    };


    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    };
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };

