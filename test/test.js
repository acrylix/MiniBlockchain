var assert = require('assert');
var Blockchain = require('../blockchain.js');
var Transaction = require('../transaction.js');
var Block = require('../block.js');

describe('Blockchain', function() {
  describe('Create', function() {
    it('should create new blockchain instance with genesis block', function() {
      let Chain = new Blockchain();

      assert(Chain.chain.length == 1);
      assert(Chain.chain[0].transactions == 'Genesis Block');
    });
  });
  describe('Mining', function(){
    it('should mine pending tx', function(){
      let Chain = new Blockchain();

      Chain.createTransaction(new Transaction('address1', 'address2', 100));
      Chain.createTransaction(new Transaction('address2', 'address1', 50));

      Chain.minePendingTx('minerAddress1');

      assert(Chain.pendingTx.length == 1);
    });
  });
  describe('Block tampering', function(){
    it('should transaction tampering return invalid chain', function(){
      let Chain = new Blockchain();

      Chain.createTransaction(new Transaction('address1', 'address2', 100));
      Chain.createTransaction(new Transaction('address2', 'address1', 50));

      Chain.minePendingTx('minerAddress1');

      Chain.chain[1].transactions = {amount:999};
      assert(!Chain.isChainValid());
    });
  });
});
