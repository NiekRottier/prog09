import fetch from "node-fetch";
import hashing from './hashing.js'

async function main() {
    // Fetch the blockchain
    let data = await hashing.fetchBlockchain()
    let generalTime = data.timestamp
    let transactions = data.transactions
    let blockchain = data.blockchain

    // Create the string to hash
    let transactionInfo = `${blockchain.hash}${blockchain.data[0].from}${blockchain.data[0].to}${blockchain.data[0].amount}${blockchain.data[0].timestamp}${blockchain.timestamp}${blockchain.nonce}`

    console.log(transactionInfo);

    let ASCIIArray = hashing.txtToASCII(transactionInfo)

    let ASCIIBlocks = hashing.separateBlocks(ASCIIArray)

    let mod10String = hashing.mod10(ASCIIBlocks)

    let sha256String = hashing.sha256(mod10String)

    console.log(sha256String);

    // Find the next nonce
    let nonce = hashing.findNonce(sha256String, generalTime, transactions[0], data.open)

    console.log(nonce);

    // Put the nonce and name into the blockchain
    fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                'nonce': nonce, 
                'user': 'Niek Rottier 0983249'
            })
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            console.log('Put the nonce in the blockchain')
        })
}

main()