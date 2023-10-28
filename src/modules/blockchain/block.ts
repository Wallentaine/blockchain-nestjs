import { SHA256, enc } from 'crypto-js';
import { Transaction } from './transaction';

export class Block {
    private timestamp;
    private transactions;
    private previousHash;
    private hash;
    private nonce;

    constructor(timestamp: number, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    getCurrentHash() {
        return this.hash;
    }

    getPreviousHash() {
        return this.previousHash;
    }

    getTransactions() {
        return this.transactions;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString(enc.Hex);
    }

    mineBlock(difficulty) {
        while (this.getCurrentHash().substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined: ${this.getCurrentHash()}`);
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}
