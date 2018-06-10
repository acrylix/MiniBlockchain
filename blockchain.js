const SHA256 = require('crypto-js/sha256');
const Transaction = require('./transaction.js');
const Block = require('./block.js');

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTx = [];
    this.miningReward = 100;
  }

  createGenesisBlock(){
    return new Block("01/01/2018", "Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  minePendingTx(miningRewardAddress){
    //Includes all pending TX, in reality however, miners gets to choose which TX to include (higher gas price etc.)
    let block = new Block(Date.now(), this.pendingTx);
    block.mineBlock(this.difficulty);

    console.log('Block sucessfully mined!');
    this.chain.push(block);

    this.pendingTx = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction){
    this.pendingTx.push(transaction);
  }

  getBlanaceOfAddress(address){
    let balance = 0;
    for(const block of this.chain){
      for(const tx of block.transactions){
        if(tx.fromAddress === address){
          balance -= tx.amount;
        }
        if(tx.toAddress === address){
          balance += tx.amount;
        }
      }
    }
    return balance;
  }

  isChainValid(){
    for(let i=1; i<this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      //current block fails hash caluclation
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      //check link hash
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;

let AcrylixChain = new Blockchain();

AcrylixChain.createTransaction(new Transaction('address1','address2',100));
AcrylixChain.createTransaction(new Transaction('address2','address1',50));
AcrylixChain.createTransaction(new Transaction('address2','address3',50));

console.log('Starting miner');
AcrylixChain.minePendingTx('minerAddress1');

console.log('Starting miner 2');
AcrylixChain.minePendingTx('minerAddress1');

console.log('Balance of miner is', AcrylixChain.getBlanaceOfAddress('minerAddress2'));
console.log('Balance of address2',AcrylixChain.getBlanaceOfAddress('address2'));
