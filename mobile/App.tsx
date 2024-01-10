import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { THEME } from "./src/theme";
import { AuthContextProvider } from "@contexts/AuthContext";
import { Routes } from "@routes/index";
import { Loading } from "@components/Loading/Loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        {fontsLoaded ? (
          <Routes />
        ) : (
          <Loading />
        )}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
