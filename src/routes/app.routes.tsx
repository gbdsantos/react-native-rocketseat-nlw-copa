import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Find } from "../screens/Find";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";

import { PlusCircle, SoccerBall } from "phosphor-react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
          height: sizes[22],
          position: "absolute",
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        component={New}
        name="new"
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo bolão",
        }}
      />
      <Screen
        component={Pools}
        name="polls"
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus bolões",
        }}
      />

      <Screen
        component={Find}
        name="find"
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
