import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";

import { useAuth } from "../hooks/userAuth";

export function Routes() {
  const { user } = useAuth();

  return (
    <Box bgColor="gray.900" flex={1}>
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}
