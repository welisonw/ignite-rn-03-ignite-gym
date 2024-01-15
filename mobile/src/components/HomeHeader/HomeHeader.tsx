import { useAuthContext } from "@contexts/AuthContext";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { api } from "@services/api";
import Avatar from "@assets/userPhotoDefault.png";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const HomeHeader = () => {
  const { user, signOut } = useAuthContext();

  return (
    <HStack
      alignItems="center"
      bgColor="gray.600"
      pt={16}
      pb={6}
      px={8}
    >
      <UserPhoto
        source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : Avatar}
        alt="Foto do usuário"
        size={16}
      />

      <VStack flex={1} ml={4}>
        <Text color="gray.100" fontFamily="body" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontFamily="heading" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          size={7}
          color="gray.200"
        />
      </TouchableOpacity>
    </HStack>
  );
};
