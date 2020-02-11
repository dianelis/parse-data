const moment = require('moment')

// Import your parseProduction module

// We'll execute the script with node index.js
// Expected result in the console should be the following
/*
Map {
  '2019' => Map {
    '7' => 31,
    '6' => 30,
    '5' => 31,
    '4' => 30,
    '3' => 31,
    '2' => 28,
    '1' => 31
  },
  '2018' => Map { 
  	'12' => 31
  	'11' => 29
  	'10' => 31
  	'9' => 30
  	'8' => 29
  }
}
*/

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

const parseProduction = (systemProduction, estimatedProduction) => {

    let startDate = systemProduction.start_date;
	let lastDay = moment(systemProduction.start_date).add(365, 'day');
	let production = systemProduction.production;

	let stop = false;

	let newProd = production.reverse().map(element => {

		let elementDay = moment(lastDay);
		lastDay = moment(lastDay).subtract(1, 'days');
		let elementMonth = elementDay.month() + 1;
		let daysInMonth = elementDay.daysInMonth();
		let estimatedProd = estimatedProduction.get(elementMonth)
		let dailyProd = estimatedProd / daysInMonth;
		if (element > 0) stop = true;
		if (!stop && element === 0) element = dailyProd;
		return element;
    })

	console.log(newProd)
	
	// let output = new Map([["blah", new Map([["blah", "blah"]]) ]]); // example

	let response = newProd.reverse().reduce((acc, val) => {

		let monthForThisDay = moment(startDate).month() + 1;
		let daysInMonth = moment(startDate).daysInMonth();
		let myProductionMap = new Map()

		let prodSum = newProd.reduce((a,b)  => a + b, 0);
		console.log(prodSum)

		myProductionMap.set( monthForThisDay, prodSum )	

		return myProductionMap;
	}, new Map ());

	console.log(response);
    return response;
}

parseProduction(systemProduction, estimatedProduction);

module.exports = { parseProduction };