import hashing from './hashing.js'

async function searchNonce() {
    // Fetch the chain
    let data = await fetchBlockchain()

    // Check if the blockchain is open
    if (data.open) {
        console.log('Blockchain open')

        let prevBlock = data.blockchain
        // console.log(prevBlock)

        let nextBlock = data.transactions[0]
        // console.log(nextBlock)

        let prevString = prevBlock.hash + prevBlock.data[0].from + prevBlock.data[0].to + prevBlock.data[0].amount + prevBlock.data[0].timestamp + prevBlock.timestamp + prevBlock.nonce
        
        // console.log(prevString)
        hashPrevString = await txtToASCII(prevString)

        let newString = hashPrevString + nextBlock.from + nextBlock.to + nextBlock.amount + nextBlock.timestamp + data.timestamp

        console.log(newString)

        let hashNum = ''

        // Find the correct nonce
        console.log('Searching for the correct nonce...');
        let nonce = 0
        while (hashNum.substring(0,4) !== '0000') {
            hashNum = await hash(newString + nonce)

            nonce++
        }
        console.log('Hash: ' + hashNum + ' | Nonce: ' + nonce);

        // If the hash starts with four 0's, POST the name and nonce
        if(hashNum.substring(0,4) === '0000') {
            console.log('Found the right nonce!')

            fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({nonce: nonce, user: 'Niek Rottier 0983249'})
              })
              .then((res) => res.json())
              .then((json) => console.log(json))
              .then((res) => console.log('Put the nonce in the blockchain'))
        }

    } else {
        console.log('Blockchain closed')
    }
}

// searchNonce()

async function main() {
    // let data = await hashing.fetchBlockchain()
    // let generalTime = data.timestamp
    // let transactions = data.transactions
    // let blockchain = data.blockchain

    // let transactionInfo = `${blockchain.hash}${blockchain.data[0].from}${blockchain.data[0].to}${blockchain.data[0].amount}${blockchain.data[0].timestamp}${blockchain.timestamp}${blockchain.nonce}`

    // console.log(transactionInfo);

    let ASCIIArray = hashing.txtToASCII('Hello Worldy!')

    let ASCIIBlocks = hashing.separateBlocks(ASCIIArray)

    let mod10String = hashing.mod10(ASCIIBlocks)

    // let sha256String = await hashing.sha256(mod10String)

    // console.log(sha256String);

    // Check if sha256String starts with 4 zeros - While-loop? - FindCorrectNonce()?
}

main()