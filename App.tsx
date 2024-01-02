import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading/Loading";
import { THEME } from "./src/theme";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Text>Open up App.tsx to start working on your app!</Text>
      ) : (
        <Loading />
      )}
    </NativeBaseProvider>
  );
}
