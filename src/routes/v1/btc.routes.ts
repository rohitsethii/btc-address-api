import { Request, Response, NextFunction, Router } from "express";
import BaseRoute from "@baseRoute";
import { BTCControllerV1 } from "@controllers";


export class BTCRoutes extends BaseRoute {
    
    constructor() {
        super();
        this.initRoutes();
    }

    get instance(): Router {
        return this.router;
    }

    initRoutes() {

        /** gets the segwit address for given mnemonic and path */
        this.router.post('/wallet/generateAddr',
            (req: Request, res: Response, next: NextFunction) => {
                BTCControllerV1.generateSegWitAddress(req, res, next);
            }
        );

        /** gets the detail of single art */
        this.router.post('/wallet/P2SHMultiSigAddr',
            (req: Request, res: Response, next: NextFunction) => {
                BTCControllerV1.generateMultisigAddress(req, res, next);
            }
        );

    }

}

export default new BTCRoutes();