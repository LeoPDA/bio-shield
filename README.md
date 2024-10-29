# Bio Shield

## Sobre o projeto

Bio Shield: SISTEMA DE IDENTIFICAÇÃO E AUTENTICAÇÃO BIOMÉTRICA FACIAL é um projeto tem como objetivo demonstrar a implementação de um sistema de segurança baseado em validação biométrica facial, garantindo o acesso ao cofre oculto no Ministério do Meio Ambiente. O sistema será estruturado em três níveis de segurança:

Nível 1: Acesso concedido a indivíduos com permissão geral. <br>
Nível 2: Acesso restrito a diretores de divisões. <br>
Nível 3: Acesso exclusivo ao ministro do Meio Ambiente.

Através dessa abordagem, buscamos assegurar que apenas usuários autorizados possam acessar informações sensíveis, contribuindo para a proteção de dados críticos.

## Estrutura do Pastas

```
Bio-Shield
├── backend  # Código-fonte e configurações do backend do projeto em Django.
│   ├── media # Arquivos de mídia (imagens) enviados pelos usuários.
│   ├── project  # Configurações do projeto Django.
│   ├── .env  # Arquivo de configuração de variáveis de ambiente.
│   ├── .env.example  # Exemplo de arquivo de configuração de variáveis de ambiente.
│   ├── .gitignore  # Arquivo de configuração do Git.
│   ├── docker-compose.yml  # Arquivo de configuração do Docker Compose.
│   ├── manage.py  # Script de gerenciamento do projeto Django.
│   ├── poetry.lock  # Arquivo de lock do Poetry.
│   ├── pyproject.toml  # Arquivo de configuração do Poetry.
│   └── README.md  # Documentação do backend.
│
├── frontend  # Código-fonte e configurações do React
│   ├── node_modules  # Dependências do projeto.
│   ├── public  # Arquivos públicos do projeto.
│   ├── src  # Código-fonte do projeto.
│   ├── .gitignore  # Arquivo de configuração do Git.
│   ├── components.json # Arquivo de configuração do Shadcn UI.
│   ├── eslint.config.js # Arquivo de configuração do ESLint.
│   ├── index.html  # Página HTML do projeto.
│   ├── package.json  # Arquivo de configuração do NPM.
│   ├── package-lock.json  # Arquivo de lock do NPM.
│   ├── postcss.config.js  # Arquivo de configuração do PostCSS.
│   ├── README.md  # Documentação do frontend.
│   ├── tailwind.config.js  # Arquivo de configuração do Tailwind CSS.
│   ├── tsconfig.json  # Arquivo de configuração do TypeScript.
│   ├── tsconfig.app.json  # Arquivo de configuração do TypeScript.
│   ├── tsconfig.node.json  # Arquivo de configuração do TypeScript.
│   └── vite.config.ts  # Arquivo de configuração do Vite.
│
└── README.md  # Documentação principal do projeto.
```

## Tecnologias Utilizadas

### Backend

- [**Python**](https://www.python.org/)
- [**Django**](https://www.djangoproject.com/)
- [**Django REST framework**](https://www.django-rest-framework.org/)
- [**Poetry**](https://python-poetry.org/)

### Frontend

- [**Node.js**](https://nodejs.org/)
- [**NPM**](https://www.npmjs.com/)
- [**React**](https://reactjs.org/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Vite**](https://vitejs.dev/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**Shadcn UI**](https://shadcn-ui.vercel.app/)
- [**ESLint**](https://eslint.org/)
- [**Prettier**](https://prettier.io/)
- [**PostCSS**](https://postcss.org/)

### Banco de Dados

- [**PostgreSQL**](https://www.postgresql.org/)

### DevOps

- [**Git**](https://git-scm.com/downloads)
- [**Docker**](https://www.docker.com/)
- [**Docker Compose**](https://docs.docker.com/compose/)
- [**GitHub Actions**](https://docs.github.com/pt/actions)
- [**Azure**](https://azure.microsoft.com/pt-br/)

## Pré-requisitos

- [**Python**](https://www.python.org/)
- [**Poetry**](https://python-poetry.org/)
- [**Node.js**](https://nodejs.org/)
- [**NPM**](https://www.npmjs.com/)
- [**Docker**](https://www.docker.com/)
- [**Docker Compose**](https://docs.docker.com/compose/)
- [**Git**](https://git-scm.com/downloads)

## Rodando Localmente

1. Clone o repositório

```bash
git clone https://github.com/LeoPDA/bio-shield.git
```

2. Entre na pasta do projeto

```bash
cd bio-shield
```

## Backend

Entre na pasta do backend

```bash
cd backend
```

Crie um arquivo `.env` na raiz do projeto

```bash
touch .env
```

Copie o conteúdo do arquivo `.env.example` para o arquivo `.env`

```bash
cp .env.example .env
```

Instale as dependências

```bash
poetry install
```

Inicie o ambiente virtual

```bash
poetry shell
```

Execute as migrações

```bash
python manage.py migrate
```

Crie um superusuário

```bash
python manage.py createsuperuser
```

Inicie o servidor

```bash
python manage.py runserver
```

## Frontend

Entre na pasta do frontend

```bash
cd frontend
```

Instale as dependências

```bash
npm install
```

Inicie o aplicativo

```bash
npm run dev
```

Acesse o aplicativo em [http://localhost:5173](http://localhost:5173)

## Funcionalidades

- Em breve

## Desenvolvedores

- [Rafael Ferreira Machado](https://github.com/rafaelmachadobr)
- [Kayky Vasconcelos](https://github.com/kaykyvasconcelos)
- [Leonardo Arouche](https://github.com/LeoPDA)
- [Samara Marques](https://github.com/samrqs)
- [Thais](https://github.com/thaisisi)
