const mapTransactions = (transactions, dues) => {
    const feeDeposited = {
        tutionFee: 0,
        hostelRent: 0,
        messBill: 0,
        others: 0,
    };

    transactions.forEach((val) => {
        feeDeposited.tutionFees += val.breakDown.tutionFee;
        feeDeposited.hostelRent += val.breakDown.hostelRent;
        feeDeposited.messBill +=
            val.breakDown.messAdvance + val.breakDown.messDues;
        feeDeposited.others += val.breakDown.others;
    });

    for (let i = 0; i < dues.tutionFee.length; ++i) {
        if (dues.tutionFee[i].amount >= feeDeposited.tutionFee) {
            dues.tutionFee[i].paidAmount = feeDeposited.tutionFee;
            feeDeposited.tutionFee = 0;
            break;
        } else {
            dues.tutionFee[i].paidAmount = dues.tutionFee[i].amount;
            feeDeposited.tutionFee -= dues.tutionFee[i].amount;
        }
    }
    for (let i = 0; i < dues.hostelRent.length; ++i) {
        if (dues.hostelRent[i].amount >= feeDeposited.hostelRent) {
            dues.hostelRent[i].paidAmount = feeDeposited.hostelRent;
            feeDeposited.hostelRent = 0;
            break;
        } else {
            dues.hostelRent[i].paidAmount = dues.hostelRent[i].amount;
            feeDeposited.hostelRent -= dues.hostelRent[i].amount;
        }
    }
    for (let i = 0; i < dues.messBill.length; ++i) {
        if (dues.messBill[i].totalAmount >= feeDeposited.messBill) {
            dues.messBill[i].paidAmount = feeDeposited.messBill;
            feeDeposited.messBill = 0;
            break;
        } else {
            dues.messBill[i].paidAmount = dues.messBill[i].totalAmount;
            feeDeposited.messBill -= dues.messBill[i].totalAmount;
        }
    }
    for (let i = 0; i < dues.fine.length; ++i) {
        if (dues.fine[i].amount >= feeDeposited.others) {
            dues.fine[i].paidAmount = feeDeposited.others;
            feeDeposited.others = 0;
            break;
        } else {
            dues.fine[i].paidAmount = dues.fine[i].amount;
            feeDeposited.others -= dues.fine[i].amount;
        }
    }
    for (let i = 0; i < dues.libraryFine.length; ++i) {
        if (dues.libraryFine[i].amount >= feeDeposited.others) {
            dues.libraryFine[i].paidAmount = feeDeposited.others;
            feeDeposited.others = 0;
            break;
        } else {
            dues.libraryFine[i].paidAmount = dues.libraryFine[i].amount;
            feeDeposited.others -= dues.libraryFine[i].amount;
        }
    }
    for (let i = 0; i < dues.electricityBill.length; ++i) {
        if (dues.electricityBill[i].amount >= feeDeposited.others) {
            dues.electricityBill[i].paidAmount = feeDeposited.others;
            feeDeposited.others = 0;
            break;
        } else {
            dues.electricityBill[i].paidAmount = dues.electricityBill[i].amount;
            feeDeposited.others -= dues.electricityBill[i].amount;
        }
    }

    let totalAmountLeft =
        feeDeposited.tutionFee +
        feeDeposited.hostelRent +
        feeDeposited.messBill +
        feeDeposited.others;

    let i = 0;
    while (totalAmountLeft && i !== dues.fine.length) {
        if (dues.fine[i].paidAmount === dues.fine[i].amount) {
            i++;
            continue;
        }
        if (dues.fine[i].amount - dues.fine[i].paidAmount >= totalAmountLeft) {
            dues.fine[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -= dues.fine[i].amount - dues.fine[i].paidAmount;
            dues.fine[i].paidAmount = dues.fine[i].amount;
            i++;
        }
    }
    i = 0;
    while (totalAmountLeft && i !== dues.libraryFine.length) {
        if (dues.libraryFine[i].paidAmount === dues.libraryFine[i].amount) {
            i++;
            continue;
        }
        if (
            dues.libraryFine[i].amount - dues.libraryFine[i].paidAmount >=
            totalAmountLeft
        ) {
            dues.libraryFine[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -=
                dues.libraryFine[i].amount - dues.libraryFine[i].paidAmount;
            dues.libraryFine[i].paidAmount = dues.libraryFine[i].amount;
            i++;
        }
    }
    i = 0;
    while (totalAmountLeft && i !== dues.electricityBill.length) {
        if (
            dues.electricityBill[i].paidAmount ===
            dues.electricityBill[i].amount
        ) {
            i++;
            continue;
        }
        if (
            dues.electricityBill[i].amount -
                dues.electricityBill[i].paidAmount >=
            totalAmountLeft
        ) {
            dues.electricityBill[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -=
                dues.electricityBill[i].amount -
                dues.electricityBill[i].paidAmount;
            dues.electricityBill[i].paidAmount = dues.electricityBill[i].amount;
            i++;
        }
    }

    i = 0;
    while (totalAmountLeft && i !== dues.messBill.length) {
        if (dues.messBill[i].paidAmount === dues.messBill[i].totalAmount) {
            i++;
            continue;
        }
        if (
            dues.messBill[i].totalAmount - dues.messBill[i].paidAmount >=
            totalAmountLeft
        ) {
            dues.messBill[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -=
                dues.messBill[i].totalAmount - dues.messBill[i].paidAmount;
            dues.messBill[i].paidAmount = dues.messBill[i].totalAmount;
            i++;
        }
    }

    i = 0;
    while (totalAmountLeft && i !== dues.tutionFee.length) {
        if (dues.tutionFee[i].paidAmount === dues.tutionFee[i].amount) {
            i++;
            continue;
        }
        if (
            dues.tutionFee[i].amount - dues.tutionFee[i].paidAmount >=
            totalAmountLeft
        ) {
            dues.tutionFee[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -=
                dues.tutionFee[i].amount - dues.tutionFee[i].paidAmount;
            dues.tutionFee[i].paidAmount = dues.tutionFee[i].amount;
            i++;
        }
    }
    i = 0;
    while (totalAmountLeft && i !== dues.hostelRent.length) {
        if (dues.hostelRent[i].paidAmount === dues.hostelRent[i].amount) {
            i++;
            continue;
        }
        if (
            dues.hostelRent[i].amount - dues.hostelRent[i].paidAmount >=
            totalAmountLeft
        ) {
            dues.hostelRent[i].paidAmount += totalAmountLeft;
            totalAmountLeft = 0;
            break;
        } else {
            totalAmountLeft -=
                dues.hostelRent[i].amount - dues.hostelRent[i].paidAmount;
            dues.hostelRent[i].paidAmount = dues.hostelRent[i].amount;
            i++;
        }
    }

    return { newDues: dues, totalAmountLeft };
};

module.exports = mapTransactions;
