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

    const { start_date: startDate, production } = systemProduction;
	let firstZeroIndex = -1;

	const newProd = production.map((day, index) => {
		if (day === 0 && firstZeroIndex === -1) {
			foundOneAfterZero = false;
			firstZeroIndex = index;
			return day;
		} else if (day === 0) {
			return day;
		}

		firstZeroIndex = -1;
		foundOneAfterZero = true;
		return day;
	})

	if (firstZeroIndex >= 0) {
		for (let index = firstZeroIndex; index < newProd.length; index++) {
			newProd[index] = 1;			
		}
	}

	let parseStartDate = moment(startDate, 'YYYY-MM-DD');
	let monthForThisDay = parseStartDate.format('M');
	let yearForThisDay = parseStartDate.format('YYYY');
	let daysInMonth = estimatedProduction.get(+monthForThisDay);
	let interator = 1;

	let response = newProd.reduce((acc, val) => {
				
		if (daysInMonth < interator) {
			if (monthForThisDay === 12) { 
				parseStartDate.add(1, 'year'); 
			} 

			parseStartDate.add(1, 'month'); 
			interator = 1;
		}  
		monthForThisDay = parseStartDate.format('M');
		yearForThisDay = parseStartDate.format('YYYY');
		daysInMonth = estimatedProduction.get(+monthForThisDay);

		let yearToMap = acc.get(yearForThisDay) || new Map();
		let sumToDay = yearToMap.get(monthForThisDay) || 0;
		let prodSum = val + sumToDay;
		interator++;
		yearToMap.set(monthForThisDay, prodSum)	
		acc.set(yearForThisDay, yearToMap);

		return acc;
	}, new Map ());

	console.log(response);
    return response;
}

parseProduction(systemProduction, estimatedProduction);

module.exports = { parseProduction };