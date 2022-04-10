import fetch from "node-fetch";
import crypto from 'crypto'

let hashing = {}

// Change Strings to ASCII numbers
hashing.txtToASCII = (string) => {
    // console.log('Using mod10 on: ' + string);

    // Remove spaces using magic
    let str = string.replace(/\s+/g, '')

    let strASCII = []

    // Get the ASCII numbers of the letters and put them in strASCII
    for (let i = 0; i < str.length; i++) {
        // Check if it is a number, if don't look up the ASCII
        let charCode
        if (isNaN(str.charAt(i))) {
            charCode = str.charCodeAt(i)
        } else {
            charCode = parseInt(str.charAt(i))
        }

        // If charcode has double digits split it
        if (charCode >= 10) {
            // Separate
            charCode = charCode.toString().split('');
            // Back to type Number
            charCode = charCode.map(Number)
            
            // Put them in strASCII
            charCode.forEach(number => {
                strASCII.push(number)
            });

        } else {
            strASCII.push(charCode)
        }
        
        // console.log(strASCII, str.charCodeAt(i));
    }

    // console.log(strASCII);
    return strASCII
}

// Separate an array in arrays of 10
hashing.separateBlocks = (ASCIIArray) => {
    // console.log(ASCIIArray)
    let numberBlocks = []

    // Put the first 10 numbers from the array togetter in numberBlocks
    // Remove the first 10 numbers from the array
    while (ASCIIArray.length >= 10) {
        numberBlocks.push(ASCIIArray.splice(0, 10))
    }

    // console.log(numberBlocks);

    // If strASCII has a few numbers left, get extra numbers to fill strASCII to length 10
    if (ASCIIArray.length != 0) {
        let extraNumbers = []
        for (let i = 0; i < 10-ASCIIArray.length; i++) {
            extraNumbers.push(i)
            // console.log(extraNumbers);
        }

        // Merge strASCII and extraNumbers
        ASCIIArray = ASCIIArray.concat(extraNumbers)

        // Put the filled strASCII in numberblocks
        numberBlocks.push(ASCIIArray)
    }

    // console.log(numberBlocks);
    return numberBlocks
}

// mod10 hashing algorithm
hashing.mod10 = (numberBlocks) => {
    // If there's more than 1 numberBlock
    if (numberBlocks.length != 1) {
        let newNumberBlock = []

        // Get mod10 from the addition of the first and second blocks and add it to the new block
        for (let i = 0; i < numberBlocks[0].length; i++) {
            let answer = (numberBlocks[0][i] + numberBlocks[1][i])
            if (answer >= 10) {
                answer = answer - 10
            }

            newNumberBlock.push(answer)
        }

        // Replace numberblock 1 and 2 with the new block
        numberBlocks.splice(0, 2, newNumberBlock)
        // console.log(numberBlocks);

        // Call recursively
        return hashing.mod10(numberBlocks)
    } else {
        // console.log(numberBlocks[0].join(''));
        return numberBlocks[0].join('')
    }
}

// sha256 hashing algorithm
hashing.sha256 = (message) => {
    const hashHex = crypto.createHash('sha256').update(message).digest('hex');

    // console.log('Sha256 Hash: ' + hashHex)
    return hashHex;
}

hashing.findNonce = (prevHash, generalTime, transaction) => {
    let nonce = -1
    let hash = ''

    let string = `${prevHash}${transaction.from}${transaction.to}${transaction.amount}${transaction.timestamp}${generalTime}${nonce}`
    console.log(string);

    // While it hasn't found a hash starting with 4 0's
    while (hash.substring(0,4) !== '0000') {
        nonce++

        let string = `${prevHash}${transaction.from}${transaction.to}${transaction.amount}${transaction.timestamp}${generalTime}${nonce}`

        let ASCIIArray = hashing.txtToASCII(string)

        let ASCIIBlocks = hashing.separateBlocks(ASCIIArray)

        let mod10String = hashing.mod10(ASCIIBlocks)

        hash = hashing.sha256(mod10String)
    }

    console.log('Correct nonce: ' + nonce);
    console.log('Correct string: ' + string);
    console.log('Correct hash: ' + hash);

    return nonce
}

// Fetch the blockchain
hashing.fetchBlockchain = async () => {
    let data = await fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then((data) => data.json())

    // console.log(data);
    return data
}

export default hashing