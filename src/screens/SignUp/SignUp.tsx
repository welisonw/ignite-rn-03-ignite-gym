import {
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {Platform} from "react-native";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("O campo nome é obrigatório."),
  email: yup
    .string()
    .required("O campo e-mail é obrigatório.")
    .email("E-mail inválido"),
  password: yup
    .string()
    .required("O campo senha é obrigatório.")
    .min(6, "A senha deve conter no mínimo 6 dígitos"),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas não conferem."),
});

export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex="1" px={10} pb={16}>
          <Image
            source={BackgroundImage}
            defaultSource={BackgroundImage}
            alt="Pessoas treinando crossfit"
            resizeMode="contain"
            position="absolute"
          />

          <Center my={24}>
            <LogoSVG />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center mb={16}>
            <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
              Crie sua conta
            </Heading>

            <Center w="full" mb={8}>
              <Controller
                control={control}
                name="name"
                render={({field: {value, onChange}}) => (
                  <Input
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({field: {value, onChange}}) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {value, onChange}}) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    textContentType="newPassword"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password_confirm"
                render={({field: {value, onChange}}) => (
                  <Input
                    placeholder="Confirme a senha"
                    secureTextEntry
                    textContentType="password"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                    errorMessage={errors.password_confirm?.message}
                  />
                )}
              />
            </Center>

            <Button
              title="Criar e acessar"
              variant="solid"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBack}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
