// Hash using the mod10 algorithm
async function hash(string) {
    console.log('Using mod10 on: ' + string);

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

    result = await sha256(addNumberBlocks(numberBlocks))

    console.log(result)
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
        addNumberBlocks(numberBlocks)
    } else {
        console.log(numberBlocks[0].join(''));
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
    fetch('https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next')
        .then((data) => data.json())
        .then((json) => data = json)
        .then((json) => console.log(json))
}


async function searchNonce() {
    // Fetch the chain
    // let data = fetchBlockchain()
    // console.log(data)

    // let prevBlock = 


    let hashNum = await hash('Hello World! Hello World! Hello World! Fiets!')

    console.log(hashNum);
}

searchNonce()





// Hash the last block

// Use that hash and put information of the next block behind it

// Hash that string

// Try nonces by putting them at the end of the string and hashinhg

// If the hash has four 0's -> Send the nonce and your name via POST