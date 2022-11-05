import { Text, Center } from "native-base";

import Logo from "../assets/logo.svg";

export function SignIn() {
  return (
    <Center
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="gray.900"
    >
      <Text color="white" fontSize="24">
        <Logo height={40} width={212} />
      </Text>
    </Center>
  );
}
