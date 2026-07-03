# React Pokédex Case

Aplicação desenvolvida em **React** para consumir a **PokéAPI**, permitindo visualizar, pesquisar, filtrar e favoritar Pokémons.

## Tecnologias utilizadas

- React
- React Router DOM
- Axios
- CSS Modules
- Vite

## Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/react-pokeapi-case.git
```

Entre na pasta do projeto:

```bash
cd react-pokeapi-case
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## Estrutura do projeto

```
src/
├── api/                # Configuração da API
├── assets/             # Imagens e ícones
├── components/         # Componentes reutilizáveis
├── utils/              # Dados auxiliares
├── App.jsx
├── Favorites.jsx
└── main.jsx
```

## Funcionalidades

- Listagem de Pokémons utilizando a PokéAPI
- Exibição de informações como número, nome, imagem e tipos
- Pesquisa por nome em tempo real
- Filtro por tipo
- Ordenação por:
  - Menor número
  - Maior número
  - A-Z
  - Z-A
- Modal de detalhes ao clicar em um Pokémon, exibindo:
  - Imagem oficial
  - Nome
  - Número
  - Tipos
  - Altura
  - Peso
  - Habilidades
  - Estatísticas base
- Sistema de favoritos utilizando LocalStorage
- Página exclusiva de Pokémons favoritos
- Paginação com carregamento de mais Pokémons
- Persistência dos favoritos após recarregar a página
- Interface responsiva (Mobile First)

## API utilizada

A aplicação utiliza a API pública da PokéAPI.

https://pokeapi.co/

## Armazenamento

Os Pokémons favoritados são armazenados utilizando **LocalStorage**, permitindo que permaneçam salvos mesmo após atualizar a página.

## Desenvolvido por

Igor Victor da Silva
