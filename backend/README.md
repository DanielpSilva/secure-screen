# Backend - Tela segura

## Sobre

Este é o backend para da tela segura, construído em Node.js com Express e usando TypeScript, utilizando também websocket para comunicação em tempo real com o fronend

## Dependências Principais

As principais dependências deste projeto incluem:

- **Express (`express`)**: Framework web rápido, flexível e minimalista para Node.js.
- **TypeORM (`typeorm`)**: ORM para TypeScript e JavaScript (ES7, ES6, ES5). Suporta MySQL, PostgreSQL e outros bancos de dados.
- **Socket.IO (`socket.io`)**: Permite comunicações em tempo real bidirecionais entre clientes web e servidores.
- **Cors (`cors`)**: Pacote para fornecer um middleware Connect/Express que pode ser usado para habilitar CORS.
- **Body-parser (`body-parser`)**: Middleware de análise de corpo HTTP para Node.js.
- **Dotenv (`dotenv`)**: Carrega variáveis de ambiente de um `.env` para `process.env`.
- **Reflect-metadata (`reflect-metadata`)**: Permite anotações de tipo de declaração e metaprogramação.
- **Pg (`pg`)**: Cliente não-bloqueante PostgreSQL para Node.js.

## Scripts Disponíveis

- `npm start`: Inicia o servidor usando `ts-node`.
- `npm test`: Executa testes com Jest.
- `npm run lint`: Executa o ESLint para verificar a qualidade do código.
- `npm run lint:fix`: Executa o ESLint e corrige automaticamente problemas de código que podem ser corrigidos.

## Estrutura do Projeto

O backend está estruturado da seguinte forma:

- **`src/`**: O diretório raiz para o código fonte.
  - **`adapters/`**: Contém adaptadores para diferentes serviços ou APIs externas.
  - **`application/`**: Lógica da aplicação e casos de uso.
  - **`config/`**: Configurações globais, como variáveis de ambiente e configuração de banco de dados.
  - **`domain/`**: O coração do seu backend, onde as entidades e a lógica de negócios residem.
  - **`errors/`**: Definições de erros customizados e lógica de tratamento de erros.
  - **`infrastructure/`**: Configuração e setup de banco de dados, servidores, e outras infraestruturas.
  - **`routes/`**: Definição das rotas da API Express.
  - **`utils/`**: Funções utilitárias e ferramentas para serem usadas em todo o projeto.
  - **`data-source.ts`**: Arquivo de configuração para a fonte de dados do TypeORM.
  - **`server.ts`**: Ponto de entrada do servidor Express.
  - **`http.ts`**: Configurações HTTP gerais, como middlewares.

## Instalação

Para configurar o backend localmente, siga estas etapas:

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start