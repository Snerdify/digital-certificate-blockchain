const express = require('express');
const Web3 = require('web3');
const bodyParser = require('body-parser'); // Import bodyParser module
const app = express();

// Connect to the Ethereum network
const web3 = new Web3('http://localhost:8545'); // Update with your Ethereum node URL

// Use bodyParser middleware
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the digital certificate app!');
});

// Issue a certificate using blockchain
app.post('/issue-certificate', async (req, res) => {
    try {
        // Get the certificate data from the request body
        const { recipient, course, date } = req.body;

        // Load the smart contract
        const contractAddress = '0x1234567890abcdef'; // Update with your smart contract address
        const contractABI = []; // Update with your smart contract ABI
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Issue the certificate using the smart contract
        const issueCertificate = await contract.methods.issueCertificate(recipient, course, date).send({ from: '0xabcdef1234567890' }); // Update with your Ethereum account address

        res.send('Certificate issued successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to issue certificate');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
