import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Find } from "./src/screens/Find";
import { Loading } from "./src/components/Loading";
import { New } from "./src/screens/New";
import { Pools } from "./src/screens/Pools";
import { SignIn } from "./src/screens/SignIn";

import { AuthContextProvider } from "./src/contexts/AuthContext";

import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        {fontsLoaded ? <Pools /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
