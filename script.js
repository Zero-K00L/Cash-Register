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

/* let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]; */
let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

const updateCid = () => {
  cid.forEach((el, index) => {
    while (el[1] > 0) {
      el[1] -= denominations[index];
    }
  });
  console.log(cid);
  return cid;
};

const cidDisplay = () => {
  cid.forEach((el, index) => {
    const changeSpan = changeSpans[index];
    changeSpan.textContent = ` $${Number(el[1].toFixed(2))}`;
  });
  return;
};
document.addEventListener('DOMContentLoaded', cidDisplay);


const priceDisplay = () => {
  total.textContent = `Total: $${price}`;
};
document.addEventListener('DOMContentLoaded', priceDisplay);

const listOfCid = () => {
  let listOfCash = [];
  cid.forEach((el) => {
    listOfCash.push(el[1]);    
  });
  /* console.log(listOfCash); */
  return listOfCash;
};

const totalCid = () => {
  let totalCashArray = listOfCid();
  let sumOfCash = totalCashArray.reduce((a, b) => a + b, 0);
  /* console.log(sumOfCash); */
  return Math.floor(sumOfCash);
};


const CalculateChange = () => {
  let userCash = Number(userInput.value);
  let cidList = cid.reverse();
  let totalCidInDrawer = totalCid();
  let changeDueArr = [];
  const price = 1.87;
  if(userCash === price) {
    changeDueArr.push('No change due - customer paid with exact cash');
    displayStatus(changeDueArr);
    console.log('No change due - customer paid with exact cash');
    return;
  }
  else if(userCash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }
  else if(userCash > totalCidInDrawer) {
    changeDueArr.push('Status: INSUFFICIENT_FUNDS');
    displayStatus(changeDueArr);
    console.log('Status: INSUFFICIENT_FUNDS');
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
          cidList[el] -= denominations[index];
        }
        else {
          console.log('else condition');
          return;
        }
      }
    });
    cidDisplay(cidList.reverse());
    displayStatus(changeDueArr);
    console.log('This is the amountOwed', amountOwed.toFixed(2));
    console.log('This is the changeDue array',changeDueArr);
    console.log('This is the cidList array',cidList);
    return changeDueArr;  
  };

};



const displayStatus = (arr) => {
  arr.forEach((el, index) => {
    changeDue.textContent += ;

  });
  return;
};


purchaseBtn.addEventListener('click', CalculateChange);





