const fs = require('fs')

//read text file as string
const text = fs.readFileSync('./text.txt').toString()

//define regex expressions
let billPeriodRegex = /\w{3,}\s\d{1,},\s\d{4} to \w{3,}\s\d{1,},\s\d{4}/g;
let billDateRegex = /Bill date:\s*([^\n\r]*)/g;
let billNumberRegex = /Bill number:\s*([^\n\r]*)/g;
let totalChargesRegex = /Total new charges\s*\$([^\s]+)/g;
let customerAccountNumberRegex = /(\d{7} - \d{8})/g;

//initialize matched groups
let billPeriod = text.match(billPeriodRegex);
let billDate = text.match(billDateRegex);
let billNumber = text.match(billNumberRegex);
let totalCharges = text.match(totalChargesRegex);
let customerAccountNumber = text.match(customerAccountNumberRegex);

//remove uneccessary words and whitespace
customerAccountArray = customerAccountNumber[0].split(" - ")
totalChargesAmount = totalCharges[0].split(/(\s+)/)

//display required information
console.log("Customer number: " + customerAccountArray[0]);
console.log("Account number: " + customerAccountArray[1]);
console.log("Bill period: " + billPeriod[0]);
console.log(billDate[0]);
console.log(billNumber[0]);
console.log("Total new charges: " + totalChargesAmount[6]);
