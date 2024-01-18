<p align='center'>
  <img alt="Icon logo" src="./mobile/src/assets/logo-github.png#gh-light-mode-only" width="230px" />
  <img alt="Icon logo" src="./mobile/src/assets/logo.svg#gh-dark-mode-only" width="230px" />
</p>


![image](./mobile/src/assets/cover.png)

## 🗒️ Sobre o projeto
Ignite Gym é uma aplicação que tem como objetivo gerenciar e controlar treinos na academia. Nela, é possível criar uma conta, fazer login, visualizar exercícios de acordo com a categoria, selecionar um exercício para visualizar detalhes sobre a sua execução, visualizar a quantidade de séries e repetições, marcar exercício como realizado, acessar o histórico e verificar e editar informações do perfil, como foto, nome e senha.

## 🎨 Layout da aplicação
Você pode visualizar o layout do projeto no Figma [aqui](https://www.figma.com/file/2eMpDdI2NvVyfBysFripWH/Ignite-Gym-Community?type=design&is-community-duplicate=1&fuid=).

## ⚙️ Funcionalidades
- Criar conta e realizar login
- Consultar exercícios por categorias
- Consultar detalhes de cada exercícios, como execução, séries e repetições
- Marcar exercícios como concluídos, adicionando-os ao histórico
- Consultar histórico de exercícios realizados
- Editar perfil do usuário
- Navegar entre telas por bottom tabs

## 🛠️ Tecnologias e ferrementas utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [NativeBase](https://nativebase.io/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [React Native SVG Transformer](https://www.npmjs.com/package/react-native-svg-transformer)
- [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React Native Screens](https://github.com/software-mansion/react-native-screens)
- [React Native AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Axios](https://axios-http.com/docs/intro)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://www.npmjs.com/package/yup)
- [JWT (JSON Web Token)](https://jwt.io/)

## 💻 Instalando e rodando o projeto localmente
#### Requisitos
- Node.js
- Gerenciador de pacotes
- Um dispositivo móvel ou simulador para rodar o aplicativo

#### Passo 1: Clone este repositório
```bash
$ git clone https://github.com/welisonw/ignite-rn-03-ignite-gym.git
```

#### 🚧 Executando a aplicação no Backend

##### Passo 1: Acesse a pasta api
```bash
$ cd ignite-rn-03-ignite-gym/api
```

##### Passo 2: Instale as dependências
```bash
# npm
$ npm install

ou

# yarn
$ yarn install
```

##### Passo 3: Inicie o projeto
```bash
# npm
npm run dev

ou

# yarn
yarn run dev
```

> ⚠️ **Importante**: A API será iniciada na porta:3333 (http://localhost:3333).<br>
>  A documentação da API pode ser acessada em http://localhost:3333/api-docs/


#### 🚧 Executando a aplicação no Mobile

##### Passo 1: Com o backend rodando, acesse a pasta mobile
```bash
$ cd ignite-rn-03-ignite-gym/mobile
```

##### Passo 2: Instale as dependências
```bash
# npm
$ npm install

ou

# yarn
$ yarn install
```

##### Passo 3: Inicie o projeto
```bash
# npm
npm expo start

ou

# yarn
yarn expo start
```

> ⚠️ **Importante**: Escaneie o QR Code gerado com seu dispositivo móvel ou utilize um simulador para rodar o aplicativo.


## 📝 Licença
Esse projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
