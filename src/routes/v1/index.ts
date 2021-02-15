import { Router } from "express";

import BaseRoute from "@baseRoute";

import BTCRoutes from "./btc.routes";

class v1AppRoutes extends BaseRoute {

    public path = '/api/v1/btc/';

    constructor() {
        super();
        this.init();
    }

    get instance(): Router {
        return this.router;
    }

    /** initializes routes */
    private init() {
        // routes go here
        this.router.use(BTCRoutes.instance);
    }
}

export default new v1AppRoutes();