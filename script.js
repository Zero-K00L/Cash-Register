const changeDue = document.getElementById('change-due');
const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.getElementById('price');
const changeDrawer = document.getElementById('change-list-header');
const test = document.getElementById('test');
const changeSpans = document.querySelectorAll('.change-amount');
changeDue.textContent = '';

//testing purpose CID and price
let price = 19.5;
let cid = [
  ["PENNY", .50],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];









/* let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]; */

// A reversed copy of the cid array that will not be modified and used for comparison purposes
const cidCopy = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
].reverse();

// The cash value associated with each denomination of money found in the drawer, used for calculations
let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

let cidChangeArr = [
  ["PENNY", 0],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
].reverse();


// Displays the cash in drawer(cid) to the user by updating the HTML content to reflect the cid.
const cidDisplay = () => {
  cid.forEach((el, index) => {
    const changeSpan = changeSpans[index];
    changeSpan.textContent = ` $${Number(el[1].toFixed(2))}`;
  });
  return;
};
document.addEventListener('DOMContentLoaded', cidDisplay);

// This displays the price of the item defined in the JS and shows it to the user in the HTML.
const priceDisplay = () => {
  total.textContent = `Total: $${price}`;
};
document.addEventListener('DOMContentLoaded', priceDisplay);

// creates a list of just cash numerical values from cid to be used for summing the total in totalCid()
const listOfCid = () => {
  let listOfCash = [];
  cid.forEach((el) => {
    listOfCash.push(el[1]);    
  });
  /* console.log(listOfCash); */
  return listOfCash;
};

// Sums up all available cash in the drawer into one number for comparison purposes
const totalCid = () => {
  let totalCashArray = listOfCid();
  let sumOfCash = totalCashArray.reduce((a, b) => a + b, 0);
  Number(sumOfCash.toFixed(2));
  console.log('new total cid',sumOfCash)
  return sumOfCash;
};

// Calculates the change returned to the customer based on the cash they pay with and the price of the
// price of the item. Different messages are used to display different outcomes to the user based on price of
// product, cash available in the drawer(cid) and the amount the user chooses to pay with.
const CalculateChange = () => {
  let userCash = Number(userInput.value);
  let cidList = [...cid].reverse();
  let totalCidInDrawer = totalCid();
  let changeDueArr = [];
  let amountOwed = userCash - price;

  if(userCash === price) {
    const changeStatus = 'No change due - customer paid with exact cash'
    console.log(changeStatus);
    changeDue.textContent = changeStatus;
    return;
  }
  else if(userCash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  else if(amountOwed > totalCidInDrawer) {
    console.log('this is the total cid',totalCidInDrawer);
    console.log('this is the amount owed',amountOwed);
    const changeStatus = 'Status: INSUFFICIENT_FUNDS';
    console.log('Status: INSUFFICIENT_FUNDS');
    changeDue.textContent = changeStatus;
    return;
  }

  else {
    cidList.forEach((el, index) => {
      while(amountOwed > 0){
        if(el[1] > 0 && !(Number(amountOwed.toFixed(2)) - denominations[index] < 0)) {
          el[1] = Number(el[1].toFixed(2));
          amountOwed = Number(amountOwed.toFixed(2));
          /* console.log("amount Owed ",amountOwed, '-=', 'denominations[index]', denominations[index]); */
          amountOwed -= denominations[index];
          /* console.log("el[1] ",el[1], '-=', 'denominations[index]', denominations[index]); */
          el[1] -= denominations[index];
          changeDueArr.push(denominations[index]);
          cidChangeArr[index][1] += denominations[index];
        }
        else {
          console.log('else condition');
          
          return;
        }
      }
    });
    if(amountOwed === totalCidInDrawer || totalCidInDrawer === 0) {
      changeDue.textContent = "Status: CLOSED";
    }
    else {
      changeDue.textContent = "Status: OPEN";
      console.log('this is the totalCid in drawer in the else clause',totalCidInDrawer)
    }
    cidDisplay(cidList);
    displayChangeForCustomer(cidChangeArr);
    console.log('This is the amountOwed', amountOwed.toFixed(2));
    console.log('This is the changeDue array',changeDueArr);
    console.log('This is the cidList array',cidList);
    console.log('this is the total cid in drawer at the very end', totalCidInDrawer);
    console.log('this is the cid Change arr for testing', cidChangeArr);
    return;  
  };
};

purchaseBtn.addEventListener('click', CalculateChange);

// Updates the HTML to display the change returned to the customer
const displayChangeForCustomer = (arr) => {

  arr.forEach((el) => {
    if(el[1] !== 0) {
      changeDue.innerHTML += `<br>${el[0]}: $${Number(el[1].toFixed(2))}`;
    }
  });
  return;
};

test.addEventListener('click', () =>{
/*   console.log(cid.reverse());
  console.log(cidCopy); */
  let problem = 19.5 % 0.05;
  console.log(problem);
})







/* const displayChangeForCustomer = (arr) => {
  let totalCidInDrawer = totalCid();
  arr.forEach((el, index) => {
    if(el[1] !== cidCopy[index][1]) {
      let result = cidCopy[index][1] - el[1];
      changeDue.innerHTML += `<br>${el[0]}: $${Number(result.toFixed(2))}`;
    }
  });
  return;
}; */