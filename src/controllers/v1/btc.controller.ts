import { Request, Response, NextFunction } from 'express';
import * as bitcoinjs from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import BaseClass from "@baseController";

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
            if(!bip39.validateMnemonic(mnemonic))
                this.errorResponse(res, "Invalid mnemonic");
            let seed = await bip39.mnemonicToSeed(mnemonic),
                bip32 = bitcoinjs.bip32.fromSeed(seed),
                root = bip32.derivePath(path),
                keyPair = bitcoinjs.ECPair.fromPublicKey(root.publicKey);
            
            const { address } = bitcoinjs.payments.p2wpkh({ pubkey: keyPair.publicKey });
            this.sendResponse(res, SUCCESS.DEFAULT, { address });
        } catch (error) {
            this.errorResponse(res, error)
        }
    }

    async generateMultisigAddress(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        let { pubkeys , threshold } = req.body;
        
        let arr:[] = pubkeys;
        if( threshold == undefined || threshold < 1)
            this.errorResponse(res, "Invalid threshold")
        // validate public keys
        if( arr.length < Number(threshold))
            this.errorResponse(res, "threshold can't be more than public keys")
        try {
            let publickeys: any[] = arr.map((hex) => Buffer.from(hex, 'hex'));
            console.log(publickeys)
            const { address } = bitcoinjs.payments.p2sh({
                redeem: bitcoinjs.payments.p2ms({ m: Number(threshold), pubkeys: publickeys }),
            });
            this.sendResponse(res, SUCCESS.DEFAULT, { address });
        } catch (error) {
            this.errorResponse(res, error)
        }
    }
}

export const BTCControllerV1 = new BTCController();