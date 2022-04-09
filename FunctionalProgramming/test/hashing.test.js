import hashing from '../hashing.js';
import { expect } from 'chai';

describe("Convert string to ASCII array", () => {
    it('Should return \[7, 2, 1, 0, 1, 1, 0, 8, 1, 0, 8, 1, 1, 1, 8, 7, 1, 1, 1, 1, 1, 4, 1, 0, 8, 1, 0, 0, 3, 3\]', () => {
        expect(hashing.txtToASCII('Hello World!')).to.eql([7, 2, 1, 0, 1, 1, 0, 8, 1, 0, 8, 1, 1, 1, 8, 7, 1, 1, 1, 1, 1, 4, 1, 0, 8, 1, 0, 0, 3, 3])
    })
})