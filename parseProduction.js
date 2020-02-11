const moment = require('moment');

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

	let startDate = moment(startDate);

	let response = systemProduction.production.reduce((map, val) => {
		
		let year = startDate.year();

		if(!map.has(year)) {
			map.set(year, new Map([])
			)
		}

		return year;

	}, new Map())

}


let handler = ({ systemProduction, estimatedProduction }) => {

	let lastDay = moment(systemProduction.start_date).add(365, 'day');

	let production = systemProduction.production;

	return result;
};

module.exports = { handler, prod, mapResponse }



