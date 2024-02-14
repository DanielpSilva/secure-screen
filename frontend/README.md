# Frontend - Tela segura

## Sobre

Este documento fornece informações detalhadas sobre o setup do frontend para a tela. O frontend é construído com React, utilizando várias bibliotecas importantes para desenvolvimento e testes.

## Dependências Principais

- **React e React-DOM (`react`, `react-dom`)**: Uma biblioteca JavaScript para construir interfaces de usuário. `react-dom` permite o uso de elementos React no ambiente do navegador.
- **React Router DOM (`react-router-dom`)**: Gerenciamento de rotas na aplicação, permitindo navegação entre componentes sem recarregar a página.
- **Axios (`axios`)**: Cliente HTTP baseado em promessas para fazer requisições AJAX de forma simples e eficiente.
- **Bootstrap e React-Bootstrap (`bootstrap`, `react-bootstrap`)**: Framework CSS para desenvolvimento de componentes de interface e layouts responsivos. `react-bootstrap` integra o Bootstrap com componentes React.
- **Socket.IO Client (`socket.io-client`)**: Permite comunicação em tempo real entre o navegador e o servidor via WebSockets.
- **TypeScript (`typescript`)**: Superset de JavaScript que adiciona tipagem estática, melhorando o desenvolvimento e a manutenção do código.
- **Babel (`@babel/preset-env`)**: Transpilador JavaScript para converter código ECMAScript 2015+ em uma versão compatível com versões anteriores de navegadores ou ambientes.
- **Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`)**: Facilita testes de unidades de componentes React, permitindo interações mais próximas do uso real dos componentes.
- **React Scripts (`react-scripts`)**: Conjunto de scripts e configuração utilizados pelo Create React App para automatizar a construção, teste e lançamento de aplicações React.

## Instalação

Para configurar o ambiente de desenvolvimento, siga estas etapas:

# Instale as dependências
npm install ou yarn

# Inicie o servidor de desenvolvimento
npm start ou yarn start

## Estrutura do Projeto

O projeto está organizado da seguinte maneira, facilitando a manutenção e a expansão do código:

- **`src/`**: Diretório raiz para o código fonte do projeto.
  - **`components/`**: Contém componentes reutilizáveis do React que podem ser utilizados em várias partes da aplicação.
  - **`config/`**: Armazena arquivos de configuração globais, como configurações de ambiente.
  - **`providers/`**: Inclui os contextos do React (usando Context API) que permitem compartilhar estados entre componentes de forma eficaz.
  - **`types/`**: Define tipos TypeScript personalizados e interfaces para manter a consistência de tipos em todo o projeto.
  - **`utils/`**: Funções utilitárias e helpers que podem ser reutilizados em várias partes da aplicação para executar tarefas comuns.
  - **`features/`**: Organiza o código por funcionalidades ou páginas específicas, facilitando a localização de código relacionado a uma parte específica da aplicação.
    - **`home/`**: Contém componentes, serviços e lógica específica para a página inicial da aplicação.
    - **`secureScreen/`**: Inclui toda a lógica, componentes e serviços necessários para a funcionalidade da tela segura, garantindo que apenas um usuário por vez tenha acesso.
