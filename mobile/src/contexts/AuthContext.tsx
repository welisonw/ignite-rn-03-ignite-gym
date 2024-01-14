import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

interface AuthContextProps {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingStorageData] = useState(true);

  function userAndTokenUpdate(user: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });

      if (data.user && data.token) {
        setIsLoadingStorageData(true);

        await storageUserSave(data.user);
        await storageAuthTokenSave(data.token);

        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingStorageData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageData(false);
    }
  }

  // Atualizar dados do usuário no state user e no storage
  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);

      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }; 
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        signIn,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuthContext precisa ser passado dentro do AuthContextProvider"
    );

  return context;
};
