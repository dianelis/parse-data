const moment = require('moment')

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
	});

	if (firstZeroIndex >= 0) {
		for (let index = firstZeroIndex; index < newProd.length; index++) {
			newProd[index] = 1;			
		}
	}

	const parseStartDate = moment(startDate, 'YYYY-MM-DD');
	let monthForThisDay = parseStartDate.format('M');
	let yearForThisDay = parseStartDate.format('YYYY');
	let daysInMonth = estimatedProduction.get(+monthForThisDay);
	let interator = 1;

	const response = newProd.reduce((acc, val) => {
				
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

	const formattedOutput = new Map();
	Array.from(response).reverse().forEach(yearMap => {
		const monthsMap = new Map();
		Array.from(yearMap[1]).reverse().forEach(months => {
			monthsMap.set(months[0], months[1]);
		});

		formattedOutput.set(yearMap[0], monthsMap);
	});

	console.log(formattedOutput);
    return formattedOutput;
}

module.exports = { parseProduction };