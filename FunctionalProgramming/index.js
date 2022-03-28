// Hash using the mod10 algorithm
function mod10(string) {
    console.log('Using mod10 on: ' + string);

    // Remove spaces using magic
    let str = string.replace(/\s+/g, '')

    let strASCII = []

    // Get the ACSII numbers of the letters and put them in strACSII
    for (let i = 0; i < str.length; i++) {
        strASCII.push(str.charCodeAt(i))
        // console.log(strASCII, str.charCodeAt(i));
    }

    let numberBlocks = []

    // Put the first 10 numbers from the array togetter in numberBlocks
    // Remove the first 10 numbers from the array
    while (strASCII.length >= 10) {
        numberBlocks.push(strASCII.splice(0, 10))
    }

    // Get extra numbers to fill strASCII to length 10
    let extraNumbers = []
    for (let i = 0; i < 10-strASCII.length; i++) {
        extraNumbers.push(i)
        console.log(extraNumbers);
    }

    // Merge strASCII and extraNumbers
    strASCII = strASCII.concat(extraNumbers)

    // Put strASCII in numberblocks
    numberBlocks.push(strASCII)

    console.log(numberBlocks);

}

mod10('Hello World! Hello World! Hello World! Hello World! Hello World!')



// Fetch https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next

// Hash the last block

// Use that hash and put information of the next block behind it

// Hash that string

// Try nonces by putting them at the end of the string and hashinhg

// If the hash has four 0's -> Send the nonce and your name via POST