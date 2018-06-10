[![Build Status](https://travis-ci.org/acrylix/MiniBlockchain.svg?branch=master)](https://travis-ci.org/acrylix/MiniBlockchain)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
## MiniBlockchain wrote in Javascript

This is a pseudo blockchain created solely based on my own interpretation and understanding of how a blockchain works, it contains basic blockchain features such as:

- POW
- Chain validity checks
- Mining Rewards
- Transaction w/values
- Address Balance checkers

## How To Run

```javascript
var Blockchain = require('../blockchain.js');
var Transaction = require('../transaction.js');
var Block = require('../block.js');

let MyChain = new Blockchain();

MyChain.createTransaction(new Transaction('address1','address2',100));

console.log('Starting miner');
MyChain.minePendingTx('minerAddress1');

console.log('Starting miner 2');
MyChain.minePendingTx('minerAddress1');

console.log('Balance of miner is', MyChain.getBlanaceOfAddress('minerAddress1'));

```
