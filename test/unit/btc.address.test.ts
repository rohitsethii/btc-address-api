import "jest";
import { BTCAddress } from "../../src/entity";

let validMnemonic = "enact zoo dinosaur fatal vacuum cotton dynamic bike maid board century rigid";
let invalidMnemonic = "enact zoo dinosaur fatal vacuum cotton dynamic bike maid board century";

let validPath = "m/44'/0'/0'/0/0"

let threshold = 2
let invalidThreshold = 0

let validPubkeys = [
  "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
  "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
  "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
]

let invalidPubkeys = [
  '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
  '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9'
]

test("should return valid segwit address for provided mnemonic!", async () => {
  await expect(await BTCAddress.createSegwitAddress(validMnemonic, validPath))
    .toBe("bc1qk4l5c048a2md798gzh4j08aqua0gx02lttxfu2");
});

test("should throw invalid mnemonic error!", async () => {
  await expect(BTCAddress.createSegwitAddress(invalidMnemonic, validPath))
  .rejects
  .toThrowError('invalid mnemonic');
});

test("should return valid multisig address", async () => {
  await expect(await BTCAddress.createMultisigAddress(validPubkeys, threshold))
  .toBe("36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7");
});

test("should throw invalid threshold error!", async () => {
  await expect(BTCAddress.createMultisigAddress(validPubkeys, invalidThreshold))
  .rejects
  .toThrowError("invalid threshold");
});

test("should throw threshold can't be more than public keys error!", async () => {
  await expect(BTCAddress.createMultisigAddress(invalidPubkeys, 4))
  .rejects
  .toThrowError("threshold can't be more than public keys");
});