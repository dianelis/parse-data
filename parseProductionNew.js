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
    return newProd;
}


const mapResponse = (startDate, newProd) => {

	// let startingDate = moment(startDate).add(365, 'day');
	let response = newProd.map(val => {
		
		// let aYearFromNow = startingDate.year();

		// if(!map.has(aYearFromNow)) {
		// 	map.set(aYearFromNow, newMap)
		// }
		let monthForThisDay = moment(startDate).month() + 1;

		let myProductionMap = new Map()

		let dailyProd =+ val;
		myProductionMap.set(
			monthForThisDay,
			dailyProd
		)	

		console.log(val)		

		console.log(myProductionMap)
		return myProductionMap;
	}, new Map())
	return response;

}

parseProduction(systemProduction, estimatedProduction);

module.exports = { parseProduction };