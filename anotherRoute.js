const moment = require('moment')
const { estimatedProduction, systemProduction } = require('./index')

const parseProduction = (startDate, production, estimatedProduction) => {

    let updatedProd = production.reverse();
    let output = new Map();

    // add 364 - 1st day
    let lastDay = moment(startDate).add(364, 'day');
    let oneYearFromNow = moment(lastDay).year();
    // starts at 0
    let month = lastDay.month() + 1;
    let elementDay = moment(lastDay);
    let daysInMonth = elementDay.daysInMonth();
    let estimatedProd = estimatedProduction.get(month)
    let dailyProd = estimatedProd / daysInMonth;
    if (element > 0) stop = true;
    if (!stop && element === 0) element = dailyProd;

    output.set(oneYearFromNow, new Map());

    let index = 0;
    let finalIndex = month;
    let currentMonth = month;
    output.get(oneYearFromNow).set(currentMonth, 0)

    while (index < 365) {

        for (index; index < finalIndex; index++) {

            if (updatedProd[index] === 0 || updatedProd[index] === 1) {
                output.get(oneYearFromNow).set(currentMonth, output.get(oneYearFromNow).get(currentMonth) + 1)
            } else if (updatedProd[1] > 0) {}

            index += currentMonth;

            // when month reaches January, go back to December (from 1 to 12)
            if (currentMonth === 1) {
                currentMonth = 12;
                oneYearFromNow = oneYearFromNow--; // Previous year
            } else { // else decrease it by 1
                currentMonth = currentMonth--;
            }

            let daysInPrevMonth;
            switch (currentMonth) { // Finds amount of days in prev month
                case 3: // Mar -> Feb
                    daysInPrevMonth = 28;
                    break;
                case 1: // Jan -> Dec
                case 2: // Feb -> Jan
                case 4: // Apr -> March 
                case 6: // Jun -> May
                case 8: // Aug -> Jul
                case 9: // Sep -> Aug
                case 11: // Nov -> Oct
                    daysInPrevMonth = 31;
                    break;
                case 5: // May -> Apr
                case 7: // Jul -> Jun
                case 10: // Oct -> Sep
                case 12: // Dec -> Nov
                    daysInPrevMonth = 30;
                    break;
            }

            finalIndex = daysInPrevMonth + index; // adds index and days to search for next month's production
        }
    }
    return output;
}

// calling the function
parseProduction(systemProduction.start_date, systemProduction.production, estimatedProduction);

module.exports = { parseProduction };