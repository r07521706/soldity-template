 const path = require('path');
 const fs = require('fs');
 const solc = require('solc');

 const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

 const source = fs.readFileSync(inboxPath,'utf8')


 var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 


var output = JSON.parse(solc.compile(JSON.stringify(input)));
var ary = [];
// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['Inbox.sol']) {
  ary.push(
      output.contracts['Inbox.sol'][contractName].abi
  );
  ary.push(output.contracts['Inbox.sol'][contractName].evm.bytecode.object)
}

module.exports = ary;
