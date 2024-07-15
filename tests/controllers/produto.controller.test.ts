import { ProdutoController } from "controllers/controller";
import { ProdutoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

describe("ProdutoController", () => {
    let produtoUseCaseMock: jest.Mocked<ProdutoUseCase>;
    let produtoControllerMock: ProdutoController;
    const mockData = {
        nome: "X-burger com fritas",
        preco: 10,
        categoria: "lanche",
        descricao: "lanche com fritas",
        imagem: "www.lancheComFritas.com.br",
    };

    beforeEach(() => {
        produtoUseCaseMock = {} as jest.Mocked<ProdutoUseCase>;
        produtoControllerMock = new ProdutoController(produtoUseCaseMock);
    });

    describe("Given post method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should create a new produto and return it", async () => {
                const mockRequest = {
                    body: mockData,
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = { id: "someId", ...mockRequest.body };
                produtoUseCaseMock.create = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await produtoControllerMock.post(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.created,
                );
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    body: {},
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.create = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await produtoControllerMock.post(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });

    describe("Given getById method is called", () => {
        describe("When id list is present in query parameter", () => {
            it("should return the found produto list", async () => {
                const mockRequest = {
                    query: {
                        ids: "001;002;003",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = { id: "someId", ...mockRequest.body };
                produtoUseCaseMock.getByIds = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await produtoControllerMock.getByIds(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });
        describe("When the id list is not present", () => {
            it("should return a response with unprocessableEntity(422) status code", async () => {
                const mockRequest = {
                    query: { ids: "" },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await produtoControllerMock.getByIds(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing id list",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });
        describe("When an unexpected error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {} as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.getByIds = jest
                    .fn()
                    .mockRejectedValue(new Error("Server error"));

                await produtoControllerMock.getByIds(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });

    describe("Given get method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should return the found data", async () => {
                const mockRequest = {
                    params: {
                        categoria: "lanche",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = { id: "someId", ...mockRequest.body };
                produtoUseCaseMock.getByCategoria = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await produtoControllerMock.get(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });
        describe("When the categoria is not sent", () => {
            it("should return a response with unprocessableEntity(422) status code", async () => {
                const mockRequest = {
                    params: {},
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await produtoControllerMock.get(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing identifier categoria",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    params: {
                        categoria: "lanche",
                    },
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.getByCategoria = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await produtoControllerMock.get(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });

    describe("Given patch method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should return the updated data", async () => {
                const mockRequest = {
                    params: {
                        id: "someId",
                    },
                    body: {
                        nome: "novo lanche",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                const expectedResult = {
                    id: "someId",
                    ...mockRequest.body,
                    nome: "novo lanche",
                };
                produtoUseCaseMock.update = jest
                    .fn()
                    .mockResolvedValue(expectedResult);

                await produtoControllerMock.patch(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });
        describe("When the id is not sent", () => {
            it("should return a response with unprocessableEntity(422) status code", async () => {
                const mockRequest = {
                    params: {},
                    body: {
                        nome: "novo lanche",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await produtoControllerMock.patch(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing id",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    params: {
                        id: "someId",
                    },
                    body: {
                        nome: "novo lanche",
                    },
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.update = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await produtoControllerMock.patch(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
    describe("Given delete method is called", () => {
        describe("When all the data is correct and no problems are found", () => {
            it("should return the updated data", async () => {
                const mockRequest = {
                    params: {
                        id: "someId",
                    },
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    end: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.delete = jest
                    .fn()
                    .mockResolvedValue(undefined);

                await produtoControllerMock.delete(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.ok);
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });
        describe("When the id is not sent", () => {
            it("should return a response with unprocessableEntity(422) status code", async () => {
                const mockRequest = {
                    params: {},
                } as any;
                const mockResponse = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                } as any;
                const mockNextFunction = jest.fn();

                await produtoControllerMock.delete(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockResponse.status).toHaveBeenCalledWith(
                    StatusCode.unprocessableEntity,
                );
                expect(mockResponse.json).toHaveBeenCalledWith({
                    message: "Missing id",
                });
                expect(mockNextFunction).not.toHaveBeenCalled();
            });
        });

        describe("When an error happens", () => {
            it("should handle errors by calling the next function with the error", async () => {
                const mockRequest = {
                    params: {
                        id: "someId",
                    },
                } as any;
                const mockResponse = {} as any;
                const mockNextFunction = jest.fn();

                produtoUseCaseMock.delete = jest
                    .fn()
                    .mockRejectedValue(new Error("Failed to create"));

                await produtoControllerMock.delete(
                    mockRequest,
                    mockResponse,
                    mockNextFunction,
                );

                expect(mockNextFunction).toHaveBeenCalledWith(
                    expect.any(Error),
                );
            });
        });
    });
});
