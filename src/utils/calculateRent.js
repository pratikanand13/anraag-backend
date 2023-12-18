const calculateRent = async (userObj) => {
    let amount = 0;
    const rentObj = {};
    userObj.rent.foreach((element) => {
        if (rentObj[element.monthSlug]) {
            amount += element.amount;
            rentObj[element.monthSlug] += element.amount;
        } else {
            amount += element.amount;
            rentObj[element.monthSlug] = element.amount;
        }
    });

    return { totalAmount: amount, breakdown: rentObj };
};

module.exports = calculateRent;
