import {FormControl, IInputProps, Input as NativeBaseInput} from "native-base";

interface InputProps extends IInputProps {
  errorMessage?: string | null;
}

export const Input = ({
  errorMessage = null,
  isInvalid,
  ...props
}: InputProps) => {
  const isInvalidInput = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={isInvalidInput} mb={4}>
      <NativeBaseInput
        placeholderTextColor="gray.300"
        w="full"
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
        isInvalid={isInvalidInput}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        {...props}
      />

      <FormControl.ErrorMessage _text={{color: "red.500"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
