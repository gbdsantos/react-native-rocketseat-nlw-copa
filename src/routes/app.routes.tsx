import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { New } from "../screens/New";
import { Pools } from "../screens/Pools";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen component={New} name="new" />
      <Screen component={Pools} name="polls" />
    </Navigator>
  );
}
