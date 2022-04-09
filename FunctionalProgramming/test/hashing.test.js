import hashing from '../hashing.js';
import { expect } from 'chai';

describe('Convert string to ASCII array', () => {
    it('Should return \[7, 2, 1, 0, 1, 1, 0, 8, 1, 0, 8, 1, 1, 1, 8, 7, 1, 1, 1, 1, 1, 4, 1, 0, 8, 1, 0, 0, 1, 2, 1, 3, 3\]', () => {
        expect(hashing.txtToASCII('Hello Worldy!')).to.eql([
                7, 2, 1, 0, 1, 1, 0, 8, 1,
                0, 8, 1, 1, 1, 8, 7, 1, 1,
                1, 1, 1, 4, 1, 0, 8, 1, 0,
                0, 1, 2, 1, 3, 3
            ])
    })
})

let ASCIIArray = hashing.txtToASCII('Hello Worldy!')

describe('Split arrays in arrays with length 10', () => {
    it('Should return an array with 4 number arrays', () => {
        expect(hashing.separateBlocks(ASCIIArray)).to.eql([
                [
                    7, 2, 1, 0, 1,
                    1, 0, 8, 1, 0
                ],
                [
                    8, 1, 1, 1, 8,
                    7, 1, 1, 1, 1
                ],
                [
                    1, 4, 1, 0, 8,
                    1, 0, 0, 1, 2
                ],
                [
                    1, 3, 3, 0, 1,
                    2, 3, 4, 5, 6
                ]
            ])
    })
})