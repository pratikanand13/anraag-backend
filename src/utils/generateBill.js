const messBillRate = require("../../messBill.json");

const getSlug = (date) =>
    1900 + date.getYear() + "_" + String(date.getMonth()).padStart(2, "0");

const getNextSlug = (prevSlug) => {
    const year = Number(prevSlug.split("_")[0]);
    const month = Number(prevSlug.split("_")[1]);
    return getSlug(new Date(year, month + 1, 1));
};

const getFirstDateOfMonthFromSlug = (slug) => {
    const year = Number(slug.split("_")[0]);
    const month = Number(slug.split("_")[1]);
    return new Date(year, month, 1);
};

const getLastDateOfMonthFromSlug = (slug) => {
    const year = Number(slug.split("_")[0]);
    const month = Number(slug.split("_")[1]) + 1;
    return new Date(year, month, 0);
};

// console.log(getFirstDateOfMonthFromSlug("2023_03").toLocaleString());
// console.log(getLastDateOfMonthFromSlug("2023_03").toLocaleString());

const updateBillObj = (bill, startDate, endDate) => {
    let totalAmount = 0;
    let _dt = startDate;
    for (let i = 0; i < bill.rates.length; ++i) {
        if (endDate < bill.rates[i].from) break;

        if (endDate < bill.rates[i].to) {
            const days = endDate - _dt + 1;

            bill.rates[i].noDays += days;
            bill.rates[i].amount += days * bill.rates[i].cost;

            totalAmount += days * bill.rates[i].cost;
        } else {
            const days = bill.rates[i].to - _dt + 1;

            bill.rates[i].noDays += days;
            bill.rates[i].amount += days * bill.rates[i].cost;

            totalAmount += days * bill.rates[i].cost;

            _dt = bill.rates[i].to + 1;
        }
    }

    bill.totalAmount += totalAmount;
};
const generateBill = (entries) => {
    const billRate = messBillRate.bill;

    bills = [];

    let slug = getSlug(entries[0].start);
    while (
        getFirstDateOfMonthFromSlug(slug) <= entries[entries.length - 1].end
    ) {
        let _dt = 1;

        const _bill = {
            monthSlug: slug,
            rates: [],
            totalAmount: 0,
        };

        for (let i = 0; i < billRate.length; ++i) {
            if (billRate[i].end < getFirstDateOfMonthFromSlug(slug).getTime())
                continue;

            if (billRate[i].end >= getLastDateOfMonthFromSlug(slug).getTime()) {
                _obj = {
                    from: _dt,
                    to: getLastDateOfMonthFromSlug(slug).getDate(),
                    cost: billRate[i].perDayBill,
                    noDays: 0,
                    amount: 0,
                };
                _bill.rates.push(_obj);
                break;
            } else {
                _obj = {
                    from: _dt,
                    to: new Date(billRate[i].end).getDate(),
                    cost: billRate[i].perDayBill,
                    noDays: 0,
                    amount: 0,
                };
                _bill.rates.push(_obj);

                _dt = new Date(billRate[i].end).getDate() + 1;
            }
        }

        bills.push(_bill);
        slug = getNextSlug(slug);
    }

    console.log(new Date(1675535400000));
    let i = 0;
    entries.forEach((val) => {
        let _dt = val.start.getDate();
        while (true) {
            if (getLastDateOfMonthFromSlug(bills[i].monthSlug) < val.start) {
                i++;
            } else if (
                getLastDateOfMonthFromSlug(bills[i].monthSlug) <= val.end
            ) {
                updateBillObj(
                    bills[i],
                    _dt,
                    getLastDateOfMonthFromSlug(bills[i].monthSlug).getDate()
                );
                i++;
                _dt = 1;
            } else {
                updateBillObj(bills[i], _dt, val.end.getDate());
                break;
            }
        }
    });

    // console.log(bills);
    return bills;
};

// const arr = [
//     {
//         start: new Date(2022, 7, 23),
//         end: new Date(2022, 8, 12),
//     },
//     {
//         start: new Date(2022, 8, 23),
//         end: new Date(2022, 10, 30),
//     },
//     {
//         start: new Date(2023, 0, 3),
//         end: new Date(2023, 3, 29),
//     },
// ];
// generateBill(arr);
// console.log(new Date(2023, 3, 1).getDate());

module.exports = generateBill;
