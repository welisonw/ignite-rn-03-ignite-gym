import {
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";

export const SignUp = () => {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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
              Crie sua conta
            </Heading>

            <Center w="full" mb={8}>
              <Input placeholder="Nome" />
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
              />
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                textContentType="password"
              />
            </Center>

            <Button title="Criar e acessar" variant="solid" />
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
