import hashing from '../hashing.js';
import { expect } from 'chai';

describe('Convert string to ASCII array', () => {
    it('Should return \[7, 2, 1, 0, 1, 1, 0, 8, 1, 0, 8, 1, 1, 1, 8, 7, 1, 1, 1, 1, 1, 4, 1, 0, 8, 1, 0, 0, 1, 2, 1, 3, 3\]', () => {
        expect(hashing.txtToASCII('Hello Worldy!'))
            .to.eql([
                7, 2, 1, 0, 1, 1, 0, 8, 1,
                0, 8, 1, 1, 1, 8, 7, 1, 1,
                1, 1, 1, 4, 1, 0, 8, 1, 0,
                0, 1, 2, 1, 3, 3
            ])
    })
})

describe('Split arrays in arrays with length 10', () => {
    it('Should return an array with 4 number arrays', () => {
        expect(hashing.separateBlocks(hashing.txtToASCII('Hello Worldy!')))
            .to.eql([
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

describe('Use mod10 to add number arrays', () => {
    it('Should return 7061814389', () => {
        expect(hashing.mod10(hashing.separateBlocks(hashing.txtToASCII('Hello Worldy!'))))
            .to.eql('7061814389')
    })
})

describe('Use sha256 to hash a string', () => {
    it('Should return 3f9eebd0bc4d985086fa7d866fbccf2d62f027bb667b9bf2c79acc8c1b91fb71', () => {
        expect(hashing.sha256(hashing.mod10(hashing.separateBlocks(hashing.txtToASCII('Hello Worldy!')))))
            .to.eql('3f9eebd0bc4d985086fa7d866fbccf2d62f027bb667b9bf2c79acc8c1b91fb71')
    })
})

