import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthRoutes} from "./auth.routes";
import {AppRoutes} from "./app.routes";
import {Box, useTheme} from "native-base";
import {useAuthContext} from "@contexts/AuthContext";
import { Loading } from "@components/Loading/Loading";

export const Routes = () => {
  const {colors} = useTheme();
  const {user, isLoadingUserStorageData} = useAuthContext();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) return <Loading />

  return (
    <Box flex={1} bgColor="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
