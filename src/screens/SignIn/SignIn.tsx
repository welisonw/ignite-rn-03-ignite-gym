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
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Platform } from "react-native";
import BackgroundImage from "@assets/background.png";
import LogoSVG from "@assets/logo.svg";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

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
        <VStack flex="1" bgColor="gray.700" px={10} pb={16}>
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
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input placeholder="Senha" secureTextEntry />
            </Center>

            <Button title="Acessar" variant="solid" />
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
