const changeDue = document.getElementById('change-due');
const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.getElementById('price');
const changeDrawer = document.getElementById('change-list-header');
const test = document.getElementById('test');
const changeSpans = document.querySelectorAll('.change-amount');
changeDue.textContent = '';

let price = 1.87;
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
];

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
  /* console.log(sumOfCash); */
  return Math.floor(sumOfCash);
};

// Calculates the change returned to the customer based on the cash they pay with and the price of the
// price of the item. Different messages are used to display different outcomes to the user based on price of
// product, cash available in the drawer(cid) and the amount the user chooses to pay with.
const CalculateChange = () => {
  let userCash = Number(userInput.value);
  let cidList = [...cid].reverse();
  let totalCidInDrawer = totalCid();
  let changeDueArr = [];
  
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
  else if(userCash > totalCidInDrawer) {
    const changeStatus = 'Status: INSUFFICIENT_FUNDS';
    console.log('Status: INSUFFICIENT_FUNDS');
    changeDue.textContent = changeStatus;
    return;
  }

  else {
    let amountOwed = userCash - price;
    cidList.forEach((el, index) => {
      while(amountOwed > 0){
        if(el[1] > 0 && !(Number(amountOwed.toFixed(2)) - denominations[index] < 0)) {
          amountOwed -= denominations[index];
          el[1] -= denominations[index];
          changeDueArr.push(denominations[index]);
          /* cidList[el] -= denominations[index]; */
        }
        else {
          console.log('else condition');
          return;
        }
      }
    });
    if(amountOwed === totalCidInDrawer) {
      changeDue.innerHTML = "Status: CLOSED";
    }
    else {
      changeDue.innerHTML = "Status: OPEN";
    }
    cidDisplay(cidList);
    displayChangeForCustomer(cidList);
    console.log('This is the amountOwed', amountOwed.toFixed(2));
    console.log('This is the changeDue array',changeDueArr);
    console.log('This is the cidList array',cidList);
    return;  
  };
};

purchaseBtn.addEventListener('click', CalculateChange);

// Updates the HTML to display the change returned to the customer
const displayChangeForCustomer = (arr) => {
  
  arr.forEach((el, index) => {
    if(el[1] !== cidCopy[index][1]) {
      let result = cidCopy[index][1] - el[1]
      changeDue.innerHTML += `<br>${el[0]}: $${Number(result.toFixed(2))}`
    };
  });
  return;
};

test.addEventListener('click', () =>{
  console.log(cid.reverse());
  console.log(cidCopy);
})