import { IButtonProps, Button as NativeBaseButton } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant: "solid" | "outline";
}

export const Button = ({ title, variant, ...props }: ButtonProps) => {
  return (
    <NativeBaseButton
      w="full"
      px={6}
      py={4}
      bgColor={variant === "solid" ? "green.700" : "transparent"}
      borderRadius="md"
      borderWidth={variant === "solid" ? 0 : 1}
      borderColor={variant === "solid" ? "none" : "green.500"}
      _pressed={{
        bg: variant === "solid" ? "green.500" : "green.700",
        borderWidth: "none",
        _text: {
          color: "white",
        },
      }}
      _text={{
        fontFamily: "heading",
        fontSize: "md",
        color: variant === "solid" ? "white" : "green.500",
      }}
      {...props}
    >
      {title}
    </NativeBaseButton>
  );
};
