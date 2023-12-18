const calculateBill = async (userObj) => {
    let amount = 0;
    const billObj = {};
    userObj.bill.foreach((element) => {
        if (billObj[element.monthSlug]) {
            amount += element.amount;
            billObj[element.monthSlug] += element.amount;
        } else {
            amount += element.amount;
            billObj[element.monthSlug] = element.amount;
        }
    });

    return { totalAmount: amount, breakdown: billObj };
};

module.exports = calculateBill;
