const changeDue = document.getElementById('change-due');
const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.getElementById('price');
const changeDrawer = document.getElementById('change-list-header');
const test = document.getElementById('test');
const changeSpans = document.querySelectorAll('.change-amount');
changeDue.innerHTML = '';

// The price of items and array of cash in the drawer, declared with let so they can be changed for testing and
// Different scenarios
let price = 19.5;
let cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

// The cash value associated with each denomination of money found in the drawer, used for calculations
let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
// Array created to keep track of the change needed for each denomination without mutating the orignal cid array
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

// Resets the cid change array so the change displayed to the customer updates properly each time
const cidChangeArrReset = () => {
  cidChangeArr.forEach((el)=> {
    el[1] = 0;
  });
  return;
};

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

// Sums up all available cash in the drawer into one number for comparison purposes
const totalCid = (arr) => {
  let sumOfCash = arr.reduce((acc, el) => acc + el[1], 0);
  Number(sumOfCash.toFixed(2));
  return sumOfCash;
};
totalCid(cid);

// Function used to see if exact change can be made with current available denominations in the cid array
const exactChangePresent = () => {
  let userCash = Number(userInput.value);
  let amountOwedCopy = userCash - price;
  let arr = cid.map(subArr => [...subArr]).reverse();
  for(let i = 0; i < arr.length; i++) {
    while(arr[i][1] > 0 && denominations[i] <= amountOwedCopy) {
      if(amountOwedCopy > 0 && arr[i][1] >= 0) {
        arr[i][1] -= denominations[i];
        amountOwedCopy -= denominations[i];
        amountOwedCopy = Number(amountOwedCopy.toFixed(2));
      }
      else {
        return;
      }
    }
  }
  if(amountOwedCopy !==0) {
    return false;
  }
  else{
    return true;
  }
}

// Calculates the change returned to the customer based on the cash they pay with and the price of the
// price of the item. Different messages are used to display different outcomes to the user based on price of
// product, cash available in the drawer(cid) and the amount the user chooses to pay with.
const CalculateChange = () => {
  let userCash = Number(userInput.value);
  let cidList = [...cid].reverse();
  let totalCidInDrawer = totalCid(cid);
  let changeDueArr = [];
  let amountOwed = userCash - price;
  const amountOwedCopy = amountOwed;
  cidChangeArrReset();

  if(userCash === price) {
    const changeStatus = 'No change due - customer paid with exact cash'
    changeDue.textContent = changeStatus;
    return;
  }
  else if(userCash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  else if(amountOwed > totalCidInDrawer || !exactChangePresent()) {
    const changeStatus = 'Status: INSUFFICIENT_FUNDS';
    changeDue.textContent = changeStatus;
    return;
  }
  else {
    cidList.forEach((el, index) => {
      while(amountOwed > 0){
        if(el[1] > 0 && !(Number(amountOwed.toFixed(2)) - denominations[index] < 0)) {
          el[1] = Number(el[1].toFixed(2));
          amountOwed = Number(amountOwed.toFixed(2));
          amountOwed -= denominations[index];
          el[1] -= denominations[index];
          changeDueArr.push(denominations[index]);
          cidChangeArr[index][1] += denominations[index];
        }
        else {
          return;
        }
      }
    }); 
    if(amountOwedCopy === totalCidInDrawer || totalCidInDrawer === 0) {
      changeDue.innerHTML = "Status: CLOSED";
    }

    else {
      changeDue.innerHTML = "Status: OPEN";
    }
    cidDisplay(cidList);
    displayChangeForCustomer(cidChangeArr);
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
