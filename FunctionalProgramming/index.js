// Hash using the mod10 algorithm
async function hash(string) {
    // console.log('Using mod10 on: ' + string);

    // Remove spaces using magic
    let str = string.replace(/\s+/g, '')

    let strASCII = []

    // Get the ASCII numbers of the letters and put them in strASCII
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i)

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

    let numberBlocks = []

    // Put the first 10 numbers from the array togetter in numberBlocks
    // Remove the first 10 numbers from the array
    while (strASCII.length >= 10) {
        numberBlocks.push(strASCII.splice(0, 10))
    }

    // If strASCII has a few numbers left, get extra numbers to fill strASCII to length 10
    if (strASCII.length != 0) {
        let extraNumbers = []
        for (let i = 0; i < 10-strASCII.length; i++) {
            extraNumbers.push(i)
            // console.log(extraNumbers);
        }

        // Merge strASCII and extraNumbers
        strASCII = strASCII.concat(extraNumbers)

        // Put the filled strASCII in numberblocks
        numberBlocks.push(strASCII)
    }

    // console.log(numberBlocks);

    // DO NOT REMOVE the unneededNeededVar or finalNumberBlock will be undefined
    let unneededNeededVar = await addNumberBlocks(numberBlocks)

    let finalNumberBlock = await addNumberBlocks(numberBlocks)

    result = await sha256(finalNumberBlock)

    // console.log(result)
    return await result
}

async function addNumberBlocks(numberBlocks) {
    // If there's more than 1 numberBlock
    if (numberBlocks.length != 1) {
        let newNumberBlock = []

        // Get mod10 from the addition of the first and second blocks and add it to the new block
        for (let i = 0; i < numberBlocks[0].length; i++) {
            newNumberBlock.push(await mod10(numberBlocks[0][i], numberBlocks[1][i]))
        }

        // Replace numberblock 1 and 2 with the new block
        numberBlocks.splice(0, 2, newNumberBlock)
        // console.log(numberBlocks);

        // Call recursively
        await addNumberBlocks(numberBlocks)
    } else {
        // console.log(numberBlocks[0].join(''));
        return numberBlocks[0].join('')
    }
}

async function mod10(num1, num2) {
    let answer 
    answer = (num1 + num2)
    if (answer >= 10) {
        answer = answer - 10
    }
    return answer
}

async function sha256(message) {
    // console.log(message);
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Fetch https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next
async function fetchBlockchain() {
    let data = await fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then((data) => data.json())

    return data
}


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
        hashPrevString = await hash(prevString)

        let newString = hashPrevString + nextBlock.from + nextBlock.to + nextBlock.amount + nextBlock.timestamp + data.timestamp

        console.log(newString)

        let hashNum = ''

        // Find the correct nonce
        let nonce = 0
        while (hashNum.substring(0,4) !== '0000') {
            hashNum = await hash(newString + nonce)

            nonce++
        }
        console.log('Hash: ' + hashNum);


        if(hashNum.substring(0,4) === '0000') {
            console.log('You got a coin!')

            // POST to the blockchain
        } 

    } else {
        console.log('Blockchain closed')
    }
}

searchNonce()





// Hash the last block

// Use that hash and put information of the next block behind it

// Hash that string

// Try nonces by putting them at the end of the string and hashinhg

// If the hash has four 0's -> Send the nonce and your name via POST