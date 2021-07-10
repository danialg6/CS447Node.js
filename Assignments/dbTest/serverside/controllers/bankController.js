const Bank = require("../models/bank");
exports.save = async (req, res, next) => {
  try {
    const newBank = req.body;
    console.log(newBank)
    let cardNumber = Math.floor(1000000000 + Math.random() * 900000);
    let check = await Bank.checkCardNumber(cardNumber);
    while (check) {
      cardNumber = Math.floor(1000000000 + Math.random() * 900000);
      check = await Bank.checkCardNumber(cardNumber);
    }
    const d = new Date(newBank.expDate);
    const b=parseFloat(newBank.balance)
    console.log(d)
    let result =  new Bank(
      null,
      newBank.email,
      newBank.SSN,
      newBank.firstName,
      newBank.lastName,
      cardNumber,
      d,
      newBank.csv,
      b
    ).save();
    //console.log(result)
    let cardInformation = {
      cardNumber: cardNumber,
      expDate: d,
      csv: newBank.csv,
    };
    console.log(cardInformation)
    res.status(200).json(cardInformation);
  } catch (err) {
    next(err);
  }
};
exports.verifyBank = async (req, res, next) => {
    // console.log(req.body.price)
    const totalPrice = parseFloat(req.body.price);
    const lastName = req.body.lastName;
    const cardNumber = req.body.cardNumber;
    const expDate = req.body.expDate;
    const csv = req.body.csv;
    let check = await Bank.verifyBank(lastName, cardNumber, csv);
    console.log(check)
    if (check) {
      let exp = new Date(expDate);
      let dateDif = check.expDate - exp;
      if (dateDif < 0) {
          //console.log(check.balance)
          //console.log(totalPrice)
        let currentBalance = parseFloat(check.balance) - totalPrice;
        
        if (currentBalance > 0) {
            console.log(currentBalance)
          const updateBalance = await new Bank(
            check._id,
            check.email,
            check.SSN,
            check.firstName,
            check.lastName,
            check.cardNumber,
            check.expDate,
            check.csv,
            currentBalance
          ).update()
        //let result=  await updateBalance.update();
        console.log(updateBalance)
          res.status(200).json({ message: "your order is successfully" });
        } else {
          res.status(200).json({ message: "your balance is low" });
        }
      } else {
        res.status(201).json({ message: "your card is expire" });
      }
    }
  };
