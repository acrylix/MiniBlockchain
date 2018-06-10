const SHA256 = require('crypto-js/sha256');

class Transaction{
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block{
  constructor(timestamp, transactions, previousHash = ''){
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nounce = 0;
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
  }

  //POW
  mineBlock(difficulty){
    while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
      this.nounce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

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

let AcrylixChain = new Blockchain();

AcrylixChain.createTransaction(new Transaction('address1','address2',100));
AcrylixChain.createTransaction(new Transaction('address2','address1',50));
AcrylixChain.createTransaction(new Transaction('address2','address3',15));

console.log('Starting miner');
AcrylixChain.minePendingTx('minerAddress1');

console.log('Starting miner 2');
AcrylixChain.minePendingTx('minerAddress1');

console.log('Balance of miner is', AcrylixChain.getBlanaceOfAddress('minerAddress2'));
console.log('Balance of address2',AcrylixChain.getBlanaceOfAddress('address2'));
