import { Router } from "express";

import { makeProdutoRouter } from "./produtoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/produto", makeProdutoRouter());

    return serverRouter;
}
