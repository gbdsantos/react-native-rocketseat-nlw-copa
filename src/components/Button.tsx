import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY";
}

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      fontSize="md"
      h={14}
      w="full"
      textTransform="uppercase"
      rounded="sm"
      _loading={{
        _spinner: { color: "black" },
      }}
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      {...rest}
    >
      <Text
        color={type === "SECONDARY" ? "white" : "black"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
