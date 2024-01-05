import { useState } from "react";
import {
  Center,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
// import Avatar from "@assets/userPhotoDefault.png";
import * as ImagePicker from "expo-image-picker";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";


const PHOTO_SIZE = 33;

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://assets.codepen.io/1477099/internal/avatars/users/default.png");

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    
    try {
      // para acessar o álbum de fotos do usuário
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      });
  
      if (photoSelected.canceled) return null;
  
      if (photoSelected.assets[0].uri) setUserPhoto(photoSelected.assets[0].uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    };
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Center mt={6} px={10}>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuário"
                size={PHOTO_SIZE}
              />
            )}

            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text
                color="green.500"
                fontFamily="heading"
                fontSize="md"
                mt={2}
                mb={8}
              >
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input
              placeholder="Nome"
              placeholderTextColor="gray.200"
              bgColor="gray.600"
            />
            <Input placeholder="E-mail" bgColor="gray.600" isDisabled />
          </Center>

          <VStack px={10} mt={12} mb={9}>
            <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2}>
              Alterar senha
            </Heading>

            <Input
              placeholder="Senha atual"
              placeholderTextColor="gray.300"
              secureTextEntry
              bgColor="gray.600"
            />
            <Input
              placeholder="Nova senha"
              placeholderTextColor="gray.300"
              secureTextEntry
              textContentType="newPassword"
              bgColor="gray.600"
            />
            <Input
              placeholder="Confirme a nova senha"
              placeholderTextColor="gray.300"
              secureTextEntry
              bgColor="gray.600"
            />

            <Button title="Atualizar senha" variant="solid" mt={4} />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
};
