var assert = require('assert');
var Blockchain = require('../blockchain.js');
var Transaction = require('../transaction.js');
var Block = require('../block.js');

describe('Blockchain', function() {
  describe('Create', function() {
    it('should create new blockchain instance with genesis block', function() {
      let Chain = new Blockchain();

      assert(Chain.chain.length == 1);
      assert(Chain.chain[0].transactions == "Genesis Block");
    });
  });
});
