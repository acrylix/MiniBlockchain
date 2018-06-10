const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nounce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nounce
    ).toString();
  }

  //POW
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nounce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ' + this.hash);
  }
}

module.exports = Block;
