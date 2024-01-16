import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: () => void) => () => void;
};

interface PromiseType {
  onSucess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

const api = axios.create({
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

// fila das requisições que falharam
let failedQueue: PromiseType[] = [];

let isRefreshing = false;

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

        // pegando a requisição original
        const originalRequestConfig = requestError.config;

        // verificação se está acontecendo requisição de um novo token. Primeira requisição não entra no if. Na segunda sim, porque o isRefreshing é setado como true. Dentro do if vai ser implementada a lógica de adicionar as requisições na fila.
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSucess: (token: string) => {
                originalRequestConfig.headers = { "Authorization": `Bearer ${token}` };
                resolve(api(originalRequestConfig));              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            })
          });
        };

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post("/sessions/refresh-token", { refresh_token });

            await storageAuthTokenSave(data.token, data.refresh_token);

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            };

            originalRequestConfig.headers = { "Authorization": `Bearer ${data.token}` };

            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSucess(data.token);
            });

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            failedQueue.forEach(request => request.onFailure(error))

            signOut();

            reject(error);
          } finally {
            isRefreshing = false;

            failedQueue = [];
          };
        });        
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
