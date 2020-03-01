const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const Inbox = require('../compile');

let accounts;
let inbox;
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
    inbox    = await new web3.eth.Contract(Inbox[0])
    .deploy({data:Inbox[1],arguments:['hello']})
    .send({from:accounts[0],gas:'500000'});
    

});

describe('Inbox',()=>{
    it('deploy a contract~~~~',()=>{
        console.log((inbox));
    });

    it('has default msg',async()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'hello');
    });
    
    it('can change the msg',async ()=>{
        await inbox.methods.setMessage('bye')
        .send({from:accounts[0]})

        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
});