import {
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import {useAuthContext} from "@contexts/AuthContext";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigation} from "@react-navigation/native";
import {AuthNavigatorRoutesProps} from "@routes/auth.routes";
import {Platform} from "react-native";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import {AppError} from "@utils/AppError";
import {Input} from "@components/Input/Input";
import {Button} from "@components/Button/Button";

interface FormDataProps {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required("O campo e-mail é obrigatório.")
    .email("E-mail inválido"),
  password: yup.string().required("O campo senha é obrigatório."),
});

export const SignIn = () => {
  const {signIn} = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignIn({email, password}: FormDataProps) {
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível acessar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
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

          <Center mb={24}>
            <Heading color="gray.100" fontFamily="heading" fontSize="xl" mb={6}>
              Acesse sua conta
            </Heading>

            <Center w="full" mb={8}>
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
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </Center>

            <Button
              title="Acessar"
              variant="solid"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isSubmitting}
            />
          </Center>

          <Center>
            <Text mb={3} color="gray.100" fontFamily="body" fontSize="md">
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
