import { ApiPaths } from "./paths";

export const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Rotas de Produto - Fiap Arquitetura de Software",
        description:
            "Projeto do curso da pós tech Fiap Arquitetura de Software",
        version: "1.0.0",
    },
    servers: [
        {
            url: "/api",
        },
    ],
    tags: [
        {
            name: "produto",
            description: "Rotas relacionadas a produto",
        },
    ],
    paths: ApiPaths,
};
