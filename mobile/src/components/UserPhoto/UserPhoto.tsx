import { Image, IImageProps } from "native-base";
import { ImageSourcePropType } from "react-native";

interface UserPhotoProps extends IImageProps {
  size: number;
};

export const UserPhoto = ({ size, ...props }: UserPhotoProps) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={1}
      borderColor="gray.400"
      {...props}
    />
  );
};
