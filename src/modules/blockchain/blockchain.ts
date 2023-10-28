import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
    private chain: Block[];
    private difficulty;
    private pendingTransactions: Transaction[];
    private miningReward;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    createGenesisBlock(): Block {
        return new Block(32112123231, {data: JSON.stringify({content: 'GenesisBlock', amount: 0}), fromAddress: null, toAddress: null }, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress: string) {
        let block = new Block(Date.now(), this.pendingTransactions);

        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, { data: JSON.stringify({content: 'Random Reward', amount: this.miningReward})}),
        ];
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.getTransactions()) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.getCurrentHash() !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.getPreviousHash() !== previousBlock.getCurrentHash()) {
                return false;
            }
        }

        return true;
    }
}
