import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";
import { UserDTO } from "@dtos/UserDTO";

export const storageUserSave = async (user: UserDTO) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async () => {
  const storaged = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDTO = storaged ? JSON.parse(storaged) : {};

  return user;
};

export const storageUserRemove = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
