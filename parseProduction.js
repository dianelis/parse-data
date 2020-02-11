const moment = require('moment')
const { estimatedProduction, systemProduction } = require('./index')

const prod = (lastDay, production, estimatedProduction) => {

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

	return newProd.reverse();
}


const mapResponse = (startDate, newProd) => {

	let startingDate = moment(startDate);

	let response = newProd.reduce((map, val) => {
		
		let year = startingDate.year();

		let newMap = new Map([["key1", "value1"]])

		if(!map.has(year)) {
			map.set(year, newMap)
		}

		console.log(map)

		return map;

	}, new Map())

	return response;

}

let handler = ({ systemProduction, estimatedProduction }) => {

	let startDate = systemProduction.start_date;
	let lastDay = moment(systemProduction.start_date).add(365, 'day')
	let production = systemProduction.production

	return result;
};

module.exports = { handler, prod, mapResponse }