const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money.
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);

}
// store fetch response/results in res
// access data/results with res.json and store that in data
// grab first item in the results array
// with user which is 0 in results array grab the name property and inside of that grab the first (firstname) and do the same for last.
// generate a random number up to a million using floor and random


// Double the money $$$$$$
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  })

  updateDOM();
}
// data reassigned and map through using user iterator
// return what is already generated and stored in data via spread operator ... 
// set the money property to user.money but * by 2. 
// call updateDOM 


// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// sort function on data obj
// a - b = ascending numberical order. opposite for descending
// want descending (highest first /richest) so b - a 
// b.money - a.money because they are objects and we want to access the money properties. 


// FILTER ONLY MILLIONAIRES
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}
// filter function - user iterator, each user in data access user.money and filter only users with over £1m 


function calculateWealth() {
  clearTotal();
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

function clearTotal() {
  const wealth = document.querySelector('h3');

  if (wealth) {
    wealth.remove();
  }
}


// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) { // data array is default
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}
// for each item/object in the data array
// create  a div / add class (person) / add the name with temp literal via the name property from that item. also money
// append these things to main which is parent element


// Format Number as money
function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


console.log(data);