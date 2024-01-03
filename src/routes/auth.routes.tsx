import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignIn } from "@screens/SignIn/SignIn";
import { SignUp } from "@screens/SignUp/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        animation: "slide_from_left",
        headerShown: false,
      }}
    >
      <Screen 
        name="signIn"
        component={SignIn}
      />
      <Screen 
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  );
};
