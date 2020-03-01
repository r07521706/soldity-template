const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const Inbox = require('./compile');
const provider  = new HDWalletProvider(
    'stumble brand pumpkin glare gown cliff tenant potato identify entry east angle spatial master scan',
    'https://rinkeby.infura.io/v3/f81315d56e484680b00001e33eec2ae4'
)
const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();

    inbox    = await new web3.eth.Contract(Inbox[0])
    .deploy({data:'0x'+Inbox[1],arguments:['hello']})
    .send({from:accounts[0],gas:'1000000'});

    console.log(inbox.options.address);
}
// 部署過的合約0xD068024FFFD47600020741476E0bCca6f33Faa8e
//deploy();

const callContract = async()=>{
    const accounts = await web3.eth.getAccounts();
    inbox  = await new web3.eth.Contract(Inbox[0],'0xD068024FFFD47600020741476E0bCca6f33Faa8e');
    const message = await inbox.methods.message().call();
    console.log(message);
}

callContract();