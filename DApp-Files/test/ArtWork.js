const ArtWork = artifacts.require('ArtWork');
const assert = require('assert');

contract('ArtWork',(accounts) => {
    const BUYER = accounts[1];
    const ArtWork_ID =0;

    it('', async () => {
        const instance = await ArtWork.deployed();
        const originalArt = await instance.postings(
            ArtWork_ID
        );
        await instance.buyArt(ArtWork_ID, {
            from: BUYER,
            value: originalArt.price,
        });
        const updatedArt = await instance.postings(ArtWork_ID);
        assert.equal(
            updatedArt.owner,
            BUYER,
            ''
        );
    });
});