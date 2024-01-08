import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading/Loading";
import { THEME } from "./src/theme";
import { Routes } from "@routes/index";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Routes />
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
