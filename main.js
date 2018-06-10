const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
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
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2018", "Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock); //real blockchain will have more checks here
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
AcrylixChain.difficulty = 5;

console.log("Mining block 1");
AcrylixChain.addBlock(new Block(1, "09/06/2018", {amount:2}));
console.log("Mining block 2");
AcrylixChain.addBlock(new Block(2, "10/06/2018", {amount:10}));
console.log("Mining block 3");
AcrylixChain.addBlock(new Block(2, "10/06/2018", {amount:99}));

// //block tampering => false
// AcrylixChain.chain[1].data = {amount:1000};
// //even on calculate rehash, previous links r broken on hash result => false
// AcrylixChain.chain[1].hash = AcrylixChain.chain[1].calculateHash();
//
// console.log(AcrylixChain.isChainValid());
