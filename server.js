// app.js
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const DigitalCertificateContract = require('./build/contracts/DigitalCertificate.json');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Connect to Ethereum node
const web3 = new Web3('http://localhost:8545'); // Update with your Ethereum node URL
const contractAddress = '0x1234567890123456789012345678901234567890'; // Replace with your deployed contract address
const digitalCertificateContract = new web3.eth.Contract(
    DigitalCertificateContract.abi,
    contractAddress
);

app.post('/issueCertificate', async (req, res) => {
    const { recipient, certificateHash } = req.body;

    // Issue certificate using the smart contract
    const accounts = await web3.eth.getAccounts();
    await digitalCertificateContract.methods.issueCertificate(recipient, certificateHash).send({
        from: accounts[0],
        gas: '3000000',
    });

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

