import express from "express";

import refreshController from "../controllers/refreshController.mjs";

const refreshTokenRouter=express.Router();

refreshTokenRouter.post('/refresh',refreshController);

export default refreshTokenRouter;