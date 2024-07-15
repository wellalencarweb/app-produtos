# Pós Tech FIAP - Tech Challenge - 5soat - Grupo 33 - Microserviço de produtos

Projeto do curso da pós tech Fiap Arquitetura de Software

## Como rodar o projeto (Docker)

Fazer o clone e ir na pasta do projeto (por exemplo: fiap-5soat-tech-challenge)

```shell
cd fiap-5soat-tech-challenge
```

Subir os contâineres do MongoDB e do Node usando o arquivo docker-compose.yml:

```shell
docker compose -f docker-compose.yml up -d
```

Verificar se subiram os containeres fastFoodMongodb e fastFoodApi:

```shell
docker ps
```

## Como rodar o projeto para desenvolvimento local (Local + Containers)

Fazer o clone e ir na pasta do projeto (por exemplo: produtos-app)

```shell
cd produtos-app
```

Subir o contâiner PostgreSQL:

```shell
# Container PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_USER=root -e POSTGRES_DB=fast_food postgres
```

Executar script para gerar migrations do PostgreSQL

-   Necessário apenas em mudanças de schema

```shell
npm run generate
```

Executar script para executar migrations do PostgreSQL

-   Necessário apenas em mudanças de schema

```shell
npm run migrate
```

Executar o projeto em modo desenvolvimento

```shell
npm run dev
```

## Documentação das API's

Em qualquer navegador acessar a url:

```shell
http://localhost:6001/api-docs
```

## Chamando as API's

Em uma ferramenta como POSTMAN ou INSOMNIA executar por exemplo (também é possível testar no swagger):

```shell
http://localhost:6001/api/produtos/lanche
```

> Retorna os produtos na categoria lanche
