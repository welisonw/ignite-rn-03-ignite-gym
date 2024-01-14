import { useState } from "react";
import {
  Center,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ScreenHeader } from "@components/ScreenHeader/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import  {useAuthContext } from "@contexts/AuthContext";

const PHOTO_SIZE = 33;

interface FormDataProps {
  name: string;
  email?: string;
  password?: string | undefined;
  new_password?: string | null | undefined;
  confirm_new_password?: string | null | undefined;
}

const profileSchema = yup.object({
  name: yup.string().required("O campo nome é obrigatório."),
  new_password: yup
    .string()
    .min(6, "A senha deve conter no mínimo 6 dígitos")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_new_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("new_password")], "As senhas não conferem.")
    .when("new_password", {
      is: (Field: unknown) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação da nova senha.")
          .transform((value) => (!!value ? value : null)),
    }),
});

export const Profile = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://assets.codepen.io/1477099/internal/avatars/users/default.png"
  );

  const { user, updateUserProfile } = useAuthContext();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
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

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      const userUpdated = user;

      userUpdated.name = data.name;

      await api.put("/users", {
        name: data.name,
        old_password: data.password,
        password: data.new_password,
      });

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados do perfil. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
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
                  errorMessage={errors.name?.message}
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
                  isReadOnly
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
              name="new_password"
              render={({field: {onChange}}) => (
                <Input
                  placeholder="Nova senha"
                  placeholderTextColor="gray.300"
                  secureTextEntry
                  textContentType="newPassword"
                  bgColor="gray.600"
                  onChangeText={onChange}
                  errorMessage={errors.new_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="gray.300"
                  secureTextEntry
                  bgColor="gray.600"
                  onChangeText={onChange}
                  errorMessage={errors.confirm_new_password?.message}
                />
              )}
            />

            <Button
              title="Atualizar senha"
              variant="solid"
              mt={4}
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isSubmitting}
            />
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
};
