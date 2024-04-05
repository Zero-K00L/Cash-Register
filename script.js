const changeDue = document.getElementById('change-due');
const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.getElementById('price');
const changeDrawer = document.getElementById('change-list-header');
const test = document.getElementById('test');

const changeSpans = document.querySelectorAll('.change-amount');


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

const cidDisplay = () => {
  cid.forEach((el, index) => {
    const changeSpan = changeSpans[index];
    changeSpan.textContent = ` $${el[1]}`;
  });
  return;
};
document.addEventListener('DOMContentLoaded', cidDisplay);


const priceDisplay = () => {
  total.textContent = `Total: $${price}`;
};
document.addEventListener('DOMContentLoaded', priceDisplay);


const CalculateChange = () => {
  const userCash = userInput.value;
  const cidList = cid.reverse();

};





/* test.addEventListener('click', () => {
  const cidList = cid.reverse();
  cidList.forEach((el) => console.log(el[1]));
}); */

test.addEventListener('click', () => {
  userCash = userInput.value;
  console.log(userCash);
});