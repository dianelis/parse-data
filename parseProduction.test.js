const { expect } = require('chai')
const { prod, mapResponse } = require('./parseProduction');

// Monthly estimates
const estimatedProduction = new Map([
	[1, 31],
	[2, 28],
	[3, 31],
	[4, 30],
	[5, 31],
	[6, 30],
	[7, 31],
	[8, 31],
	[9, 30],
	[10, 31],
	[11, 30],
	[12, 31]
]);

const systemProduction = {
	system_id: 2,
	start_date: '2018-08-01',
	production: [
		0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	]
};

describe('updates array', () => {
    it('compares both arrays are equals', () => {
        const startDate = '2018-08-31';
        const productionTest = [1,0,0,1,1,1,1,1,1,1,0,0,0,0];
        const prodForTest = prod(startDate, productionTest, estimatedProduction);
        // console.log([1,0,0,1,1,1,1,1,1,1,1,1,1,1])
        // console.log(prodForTest);

        expect(prodForTest).to.deep.equal([1,0,0,1,1,1,1,1,1,1,1,1,1,1]);
    });
})

describe('Map Response', () => {
    it('compares both arrays are equals', () => {
        const startDate = '2018-08-31';
        const productionTest = [1,0,0,1,1,1,1,1,1,1,1,1,1,1];
        const mapTest = mapResponse(startDate, productionTest)

        // expect(mapTest).to.deep.equal("");
    });
})