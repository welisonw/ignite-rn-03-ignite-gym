import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

interface StorageAuthTokenProps {
  token: string;
  refresh_token: string
}

export const storageAuthTokenSave = async (token: string, refresh_token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }));
};

export const storageAuthTokenGet = async () => {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}

  return { token, refresh_token };  
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
