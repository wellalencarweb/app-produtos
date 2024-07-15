import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { serverConfig } from "config";
import { ProdutoSchema } from "../schemas/Produto";

const postgresClient = postgres({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    database: serverConfig.postgres.database,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
    max: 1,
});

const db = drizzle(postgresClient);

async function seedProdutos() {
    console.log("Seeding Produtos...");
    const data: (typeof ProdutoSchema.$inferInsert)[] = [
        {
            nome: "Bolo",
            preco: (20.25).toString(10),
            categoria: "sobremesa",
            descricao: "Sobremesa de chocolate com morango'",
            imagem: "www.any-image.com/fake1.jpg",
        },
        {
            nome: "Suco laranja",
            preco: (5).toString(10),
            categoria: "bebida",
            descricao: "Suco de laranja natural'",
            imagem: "www.any-image.com/fake2.jpg",
        },
        {
            nome: "Batatas fritas",
            preco: (10).toString(10),
            categoria: "acompanhamento",
            descricao: "Batatas fritas'",
            imagem: "www.any-image.com/fake3.jpg",
        },
        {
            nome: "Cachorro quente",
            preco: (15).toString(10),
            categoria: "lanche",
            descricao: "Cachorro quente simples'",
            imagem: "www.any-image.com/fake4.jpg",
        },
    ];

    await db.insert(ProdutoSchema).values(data);
    return;
}

async function runSeed() {
    console.log("Seeding Postgres...");
    await seedProdutos();
    console.log("Seed complete.");
    process.exit(0);
}

runSeed()
    .then()
    .catch((e) => {
        console.log(e);
        process.exit(0);
    });
