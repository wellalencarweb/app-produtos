import { NextFunction, Request, Response } from "express";

import { ProdutoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";
import { CategoriaEnum } from "entities/produto";

export class ProdutoController {
    constructor(private readonly produtoUseCase: ProdutoUseCase) {}

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.produtoUseCase.create(req.body);

            return res.status(StatusCode.created).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const categoria = req.params.categoria;

            if (!categoria) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier categoria" });
            }

            const result = await this.produtoUseCase.getByCategoria(
                categoria as CategoriaEnum,
            );

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getByIds(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const ids = (req.query.ids as string) || null;

            if (!ids) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing id list" });
            }

            const parsedIds = ids.split(";");

            const result = await this.produtoUseCase.getByIds(parsedIds);

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async patch(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = req.params.id;

            if (!id) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing id" });
            }

            const result = await this.produtoUseCase.update(id, req.body);

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = req.params.id;

            if (!id) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing id" });
            }

            await this.produtoUseCase.delete(id);

            return res.status(StatusCode.ok).end();
        } catch (error) {
            next(error);
        }
    }
}
