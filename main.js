const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2018", "Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock); //real blockchain will have more checks here
  }
}

let AcrylixChain = new Blockchain();

AcrylixChain.addBlock(new Block(1, "09/06/2018", {amount:999}));
AcrylixChain.addBlock(new Block(2, "10/06/2018", {amount:1}));

console.log(JSON.stringify(AcrylixChain, null, 4));
