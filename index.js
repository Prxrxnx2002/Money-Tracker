const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calcWealthBtn = document.getElementById("calculate-wealth")

let data =[]

getRandomUser()

async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }

  console.log(newUser)
  addData(newUser)
}

function addData(obj){
    data.push(obj)
    console.log(data)

    updateDOM()
}

function updateDOM(data1 = data){
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    data1.forEach(element => {
        const el = document.createElement('div')
        el.classList.add("person")
        el.innerHTML = `<strong>${element.name}</strong> ${formatMoney(element.money)}`
        main.appendChild(el)
    });    
}

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

function doubleMoney(){
    data = data.map((user)=> {
    return {...user, money: user.money * 2}
})
updateDOM()
}

function showMill(){
    data = data.filter((user) => user.money >= 1000000)
    updateDOM()
}

function sortByRichest(){
    data.sort((a,b)=> b.money-a.money)
    updateDOM()
}

function wealthCalc(){
    const tmoney = data.reduce((sum, user) => (sum += user.money),0)
    const el = document.createElement('div')
    el.innerHTML = `<h2>Total Money: <strong> ${formatMoney(tmoney)}</strong></h2>`
    main.appendChild(el)
}

addUserBtn.addEventListener("click",getRandomUser)
doubleBtn.addEventListener("click",doubleMoney)
showMillBtn.addEventListener("click",showMill)
sortBtn.addEventListener("click",sortByRichest)
calcWealthBtn.addEventListener("click",wealthCalc)
