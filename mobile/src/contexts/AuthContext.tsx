import {PropsWithChildren, createContext, useContext, useState} from "react";
import {UserDTO} from "@dtos/UserDTO";
import {api} from "@services/api";

interface AuthContextProps {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    try {
      const {data} = await api.post("/sessions", {
        email,
        password,
      });

      if (data.user) setUser(data.user);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
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
