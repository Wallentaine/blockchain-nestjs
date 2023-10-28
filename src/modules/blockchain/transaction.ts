import { SHA256, enc } from 'crypto-js';
import { ec } from 'elliptic';

const elliptic = new ec('secp256k1');

export class Transaction {
    private readonly fromAddress: string;
    private toAddress: string;
    private data: string;
    private signature: string;

    constructor(fromAddress: string, toAddress: string, data) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.data = data;
    }

    public calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.data).toString(enc.Hex);
    }

    public signTransaction(signingKey) {
        if (signingKey.getPublic(enc.Hex) !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets');
        }

        const hashTx = this.calculateHash();
        const sign = signingKey.sign(hashTx, 'base64');
        this.signature = sign.toDER('hex');
    }

    public isValidSign() {
        if (this.fromAddress === null) {
            return true;
        }

        if (!this.signature?.length) {
            throw new Error('No signature in this transaction');
        }

        const publicKey = elliptic.keyFromPublic(this.fromAddress, 'hex');

        return publicKey.verify(this.calculateHash(), this.signature);
    }

}


