import { Icon, Text, Center } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo height={40} width={212} />

      <Button
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        title="ENTRAR COM O GOOGLE"
        type="SECONDARY"
        mt={12}
      />

      <Text color="white" mt={4} textAlign="center">
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}
