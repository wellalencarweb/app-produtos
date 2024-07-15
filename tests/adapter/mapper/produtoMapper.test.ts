import { ProdutoMapper } from "adapters/mappers/produtoMapper";
import { Categoria, Produto } from "entities/produto";
import { ProdutoDTO } from "useCases";

describe("Given produtoMapper", () => {
    const mockData = {
        id: "1",
        nome: "X-burger com fritas",
        preco: 10,
        categoria: "lanche",
        descricao: "lanche com fritas",
        imagem: "www.lancheComFritas.com.br",
    };

    describe("When toDTO is Called", () => {
        it("should format the data to DTO format", () => {
            const produto = new Produto({
                id: mockData.id,
                nome: mockData.nome,
                preco: mockData.preco,
                categoria: mockData.categoria as Categoria,
                descricao: mockData.descricao,
                imagem: mockData.imagem,
            });
            const parsed = ProdutoMapper.toDTO(produto);
            expect(parsed).toEqual(mockData);
        });
    });

    describe("When toDomain is called", () => {
        it("should parse a domain produto to dto format", () => {
            const parsed = ProdutoMapper.toDomain(mockData as ProdutoDTO);
            expect(parsed).toBeInstanceOf(Produto);
            expect(parsed).toEqual(
                new Produto({
                    id: mockData.id,
                    nome: mockData.nome,
                    preco: mockData.preco,
                    categoria: mockData.categoria as Categoria,
                    descricao: mockData.descricao,
                    imagem: mockData.imagem,
                }),
            );
        });
    });
});
