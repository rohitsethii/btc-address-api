import { Request, Response, NextFunction } from 'express';
// import * as bitcoinjs from 'bitcoinjs-lib';
// import * as bip39 from 'bip39';
import BaseClass from "@baseController";
import { BTCAddress } from "@entity";

export const SUCCESS = {
    DEFAULT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Success'
    }
}

export class BTCController extends BaseClass {

    async generateSegWitAddress(req: Request, res: Response, next: NextFunction) {
        let { mnemonic, path } = req.body;
        try {
            let address = await BTCAddress.createSegwitAddress(mnemonic,path)
            this.sendResponse(res, SUCCESS.DEFAULT, { address });
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    async generateMultisigAddress(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        let { pubkeys , threshold } = req.body;
        try {
        let address = await BTCAddress.createMultisigAddress(pubkeys,threshold);
            this.sendResponse(res, SUCCESS.DEFAULT, { address });
        } catch (error) {
            this.errorResponse(res, error)
        }
    }
}

export const BTCControllerV1 = new BTCController();