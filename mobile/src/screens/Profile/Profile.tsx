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
import { Alert, Platform, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { useAuthContext } from "@contexts/AuthContext";

const PHOTO_SIZE = 33;

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword:string
};

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://assets.codepen.io/1477099/internal/avatars/users/default.png"
  );

  const { user } = useAuthContext();

  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues:{
      name: user.name,
      email: user.email,
    },
  });


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

      // se existe foto selecionada Image Picker
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        // se existe foto selecionada File System
        if (photoInfo.exists) {
          // conversão tamanho da foto de bytes (B) para megabytes (MB)
          const PHOTO_SIZE_IN_MB = photoInfo.size / 1024 / 1024;

          if (PHOTO_SIZE_IN_MB > 5) {
            return Alert.alert(
              "Tamanho máximo excedido",
              "Essa imagem é muito grande. Escolha uma de até 5MB."
            );
          }

          setUserPhoto(photoSelected.assets[0].uri);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setPhotoIsLoading(false);
    }
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

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  placeholderTextColor="gray.200"
                  bgColor="gray.600"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E-mail"
                  placeholderTextColor="gray.200"
                  bgColor="gray.600"
                  isDisabled
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </Center>

          <VStack px={10} mt={12} mb={9}>
            <Heading color="gray.200" fontFamily="heading" fontSize="md" mb={2}>
              Alterar senha
            </Heading>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha atual"
                  placeholderTextColor="gray.300"
                  secureTextEntry
                  bgColor="gray.600"
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  placeholderTextColor="gray.300"
                  secureTextEntry
                  textContentType="newPassword"
                  bgColor="gray.600"
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="gray.300"
                  secureTextEntry
                  bgColor="gray.600"
                  onChangeText={onChange}
                />
              )}
            />

            <Button
              title="Atualizar senha"
              variant="solid"
              mt={4}
            />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
};
