import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home/Home";
import { History } from "@screens/History/History";
import { Exercise } from "@screens/Exercise/Exercise";
import { Profile } from "@screens/Profile/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  <Navigator>
    <Screen 
      name="home" 
      component={Home} 
    />
    <Screen 
      name="history" 
      component={History} 
    />
    <Screen 
      name="exercise" 
      component={Exercise} 
    />
    <Screen 
      name="profile" 
      component={Profile} 
    />
  </Navigator>;
};
