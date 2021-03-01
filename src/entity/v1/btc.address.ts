
import * as bitcoinjs from 'bitcoinjs-lib';
import * as bip39 from 'bip39';

class BTCAddressEntity {

    async createSegwitAddress(mnemonic: string, path: string) {
        // try {
            if (!bip39.validateMnemonic(mnemonic))
                throw Error("invalid mnemonic");
            let seed = await bip39.mnemonicToSeed(mnemonic),
                bip32 = bitcoinjs.bip32.fromSeed(seed),
                root = bip32.derivePath(path),
                keyPair = bitcoinjs.ECPair.fromPublicKey(root.publicKey);
            const { address } = bitcoinjs.payments.p2wpkh({ pubkey: keyPair.publicKey });
            return address;
        // } catch (error) {
            // throw error;
        // }
    }

    async createMultisigAddress(pubkeys: string[], threshold: Number) {
        // try {
            let arr: string[] = pubkeys;
            if (threshold == undefined || threshold < 1)
                throw new Error("invalid threshold")
            // validate public keys
            if (arr.length < Number(threshold))
                throw new Error("threshold can't be more than public keys")
            let publickeys: any[] = arr.map((hex) => Buffer.from(hex, 'hex'));
            const { address } = bitcoinjs.payments.p2sh({
                redeem: bitcoinjs.payments.p2ms({ m: Number(threshold), pubkeys: publickeys }),
            });
            return address;
        // } catch (error) {
            // throw error;
        // }
    }
}

export const BTCAddress = new BTCAddressEntity();