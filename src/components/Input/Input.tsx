import { IInputProps, Input as NativeBaseInput } from "native-base";

export const Input = ({ ...props }: IInputProps) => {
  return (
    <NativeBaseInput
      placeholderTextColor="gray.300"
      w="full"
      mb={4}
      p={4}
      bgColor="gray.700"
      color="gray.200"
      fontFamily="body"
      fontSize="md"
      borderRadius="md"
      borderWidth={0}
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...props}
    />
  );
};
