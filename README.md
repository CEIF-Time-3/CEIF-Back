# API Pastelaria — Sistema Backend

API RESTful desenvolvida para gerenciar o ecossistema completo de uma pastelaria.

O sistema centraliza o gerenciamento de **produtos**, **clientes**, **pedidos** e **pagamentos**, contemplando:

* Cadastro de produtos, sabores, tamanhos e adicionais;
* Cadastro e histórico de clientes;
* Criação e gerenciamento de pedidos;
* Alteração de status dos pedidos;
* Cancelamento de pedidos;
* Registro e gerenciamento de pagamentos;
* Upload e armazenamento de imagens dos produtos.

---

## Tecnologias Utilizadas

* **NestJS** — Framework Node.js baseado em TypeScript, estruturado em uma arquitetura modular utilizando **Controller, Service e Repository**.

* **Drizzle ORM** — ORM moderno, performático e fortemente tipado para interação com o banco de dados.

* **PostgreSQL** — Banco de dados relacional utilizado para persistência das informações da aplicação.

* **Class-Validator / Class-Transformer** — Utilizados para validação, transformação e higienização dos dados recebidos através das requisições.

* **Multer (`@nestjs/platform-express`)** — Middleware utilizado para captura e persistência das imagens dos produtos.

* **Docker & Docker Compose** — Utilizados para containerização da aplicação e gerenciamento dos serviços necessários para sua execução.

* **Make** — Utilizado como camada de abstração dos comandos de execução e gerenciamento do ambiente, evitando a necessidade de memorizar comandos extensos do Docker e de outras ferramentas.

---

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir as seguintes ferramentas instaladas:

* [Docker](https://www.docker.com/)
* Docker Compose
* **Make**

> O `Make` é utilizado pelo `Makefile` do projeto para abstrair os principais comandos necessários durante o desenvolvimento.
>
> Portanto, é necessário que o **driver/utilitário `make` esteja instalado e disponível no PATH do sistema operacional**.
>
> Em distribuições Linux, normalmente ele pode ser instalado através do gerenciador de pacotes da distribuição. No Windows, pode ser utilizado através do **WSL2**, **Git Bash** ou outro ambiente compatível.

---

# 🚀 Executando o Projeto

O fluxo de execução foi estruturado para que as principais operações possam ser realizadas através do **Makefile**.

Dessa forma, o desenvolvedor não precisa executar diretamente os comandos do Docker, migrações ou outras ferramentas de infraestrutura.

O fluxo básico consiste em:

```text
Configuração do ambiente
        ↓
Inicialização dos containers
        ↓
Banco de dados disponível
        ↓
Execução das migrações
        ↓
API disponível
        ↓
Health Check
```

---

## 1. Configuração das Variáveis de Ambiente

Na raiz do projeto, crie o arquivo de ambiente a partir do modelo disponibilizado:

```bash
cp .env-dev.example .env
```

O arquivo `.env` deve conter as configurações necessárias para o ambiente escolhido.


> As variáveis disponíveis podem variar conforme as necessidades da aplicação. Sempre utilize o arquivo `.env-dev.example` como referência para novas configurações.

---

## 2. Inicialização da Aplicação

Com as variáveis de ambiente configuradas, utilize o **Makefile** para inicializar o ambiente de desenvolvimento.

Exemplo:

```bash
make dev-up
```

O comando disponibilizado pelo `Makefile` é responsável por abstrair a execução dos comandos necessários para inicializar os containers da aplicação.

Internamente, o projeto utiliza o Docker Compose para subir os serviços necessários, incluindo a aplicação e o banco de dados PostgreSQL.

### Execução sem o Makefile

Caso seja necessário executar diretamente o Docker Compose, o equivalente ao processo de desenvolvimento é:

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

> A utilização do `Makefile` é recomendada para manter os comandos de execução padronizados e facilitar a experiência de desenvolvimento.

---

## 3. Aplicação das Migrações

Após a inicialização dos containers, é necessário garantir que a estrutura do banco de dados esteja atualizada.

As migrações são gerenciadas pelo **Drizzle ORM**.

A execução pode ser realizada através do comando disponibilizado pelo `Makefile`:

```bash
make db-migrate
```

Caso seja necessário executar diretamente o comando do Drizzle:

```bash
npx drizzle-kit migrate
```

As migrações são responsáveis por aplicar no PostgreSQL as alterações estruturais definidas pelo projeto.

---

## 4. Verificação da Aplicação

Após a inicialização dos containers e aplicação das migrações, a API estará disponível na porta configurada no ambiente.

Por padrão:

```text
http://localhost:3000
```

Para verificar se a aplicação está funcionando corretamente, utilize o endpoint de **Health Check**:

```http
GET http://localhost:3000/health
```

A resposta desse endpoint permite validar se a aplicação está disponível e respondendo corretamente às requisições.

---

# 🐳 Ambientes da Aplicação

O projeto possui configurações distintas para os ambientes de **desenvolvimento** e **produção**.

A documentação do fluxo anterior utiliza o ambiente de desenvolvimento como referência, pois ele representa o ciclo completo necessário para executar a aplicação localmente.

A mesma estrutura é utilizada para produção, com diferenças principalmente na configuração dos containers e no processo de build.

Os arquivos responsáveis pelo gerenciamento desses ambientes são:

```text
docker-compose.dev.yml
docker-compose.prd.yml
```

O ambiente de desenvolvimento utiliza:

* Hot Reload;
* Código fonte montado no container;
* Configurações específicas para desenvolvimento.

Enquanto o ambiente de produção utiliza:

* Build otimizado;
* Imagem compilada;
* Configurações específicas para execução em produção.

---

# 🧰 Makefile

O projeto disponibiliza um `Makefile` para simplificar as operações mais comuns durante o desenvolvimento.

Em vez de executar comandos extensos diretamente no terminal, o desenvolvedor pode utilizar comandos padronizados:

```bash
make <comando>
```

Entre as operações abstraídas pelo `Makefile`, estão as relacionadas a:

* Inicialização dos containers;
* Parada dos containers;
* Rebuild das imagens;
* Execução das migrações;
* Outros comandos recorrentes do projeto.

Para consultar todos os comandos disponíveis:

```bash
make help
```

> A lista exata de comandos disponíveis deve ser consultada diretamente no `Makefile` do projeto, que funciona como a fonte de referência para as operações automatizadas.

---

# 📌 Fluxo Resumido

Após instalar os pré-requisitos, o fluxo básico para executar o projeto é:

```bash
# 1. Configurar o ambiente
cp .env-dev.example .env

# 2. Inicializar a aplicação
make dev-up

# 3. Executar as migrações
make db-migrate
```

Depois disso, valide a aplicação através de:

```http
GET http://localhost:3000/health
```

Se o endpoint estiver respondendo corretamente, o ambiente local estará disponível para desenvolvimento.
