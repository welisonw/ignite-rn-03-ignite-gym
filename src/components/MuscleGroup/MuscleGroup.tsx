import {
  Button,
  IButtonProps,
  IPressableProps,
  Pressable,
  Text,
} from "native-base";

interface MuscleGroupProps extends IPressableProps {
  name: string;
  isActive: boolean;
}

export const MuscleGroup = ({ name, isActive, ...props }: MuscleGroupProps) => {
  return (
    <Pressable
      alignItems="center"
      justifyContent="center"
      w={24}
      h={10}
      p={3}
      bgColor="gray.600"
      mr={3}
      rounded="sm"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...props}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontFamily={isActive ? "heading" : "body"}
        fontSize="xs"
      >
        {name}
      </Text>
    </Pressable>
  );
};
