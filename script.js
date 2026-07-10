const balanceBtn = document.querySelector(".Balance");
const detailsCard = document.querySelector(".details-card");
const modal = document.querySelector(".modal");
const incomebtn = document.querySelector(".Income");
const expencebtn = document.querySelector(".Expense");
const savingbtn = document.querySelector(".Savings");
const AddTransactionbtn = document.querySelector(".Add-Transaction");
const clsBtn = document.querySelector(".close-btn")
const amountInput = document.querySelector(".amount");
const categoryInput = document.querySelector(".category");
const typeInput = document.querySelector(".type");
const dateInput = document.querySelector(".date");
const descriptionInput = document.querySelector(".discription");
const saveBtn = document.querySelector(".save-btn");
const transactionHistory = document.querySelector(".transaction-history");
const empty = document.querySelector(".empty");
const chartEmpty = document.querySelector(".chart-empty");
const chartCanvas = document.getElementById("myChart");
const summary = document.querySelector(".summarycard");
const search = document.querySelector(".search input");
search.addEventListener("input", searching);
const sort = document.querySelector(".sort");
sort.addEventListener("change", sorting);
const themeBtn = document.querySelector(".theme");
let btn = themeBtn.addEventListener('click', () =>{
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        themeBtn.innerHTML = `☀️`
    }
    else{
        themeBtn.innerHTML = `🌙`
    }
});
let SavingGoal = 0;
const goal = localStorage.getItem("SavingGoal");
const filters = document.querySelector(".filter");
filters.addEventListener("change", filtering);
if(goal){
    SavingGoal = JSON.parse(goal);
}
let editid = null;
let transactions = [];
const data = localStorage.getItem("transactions");

if(data){
    transactions = JSON.parse(data);
}
console.log(chartEmpty);
updateBalancebtn();
updateExpensebtn();
updateIncomebtn();
updateSavingbtn();
updateSummary();
searching();
renderTransaction();
document.addEventListener('click', (event) => {
        if(detailsCard.contains(event.target)){
            return;
        }
        else if(balanceBtn.contains(event.target)){
            return;
        }
        else if(incomebtn.contains(event.target)){
            return;
        }
        else if(savingbtn.contains(event.target)){
            return;
        }
        else if(expencebtn.contains(event.target)){
            return;
        }
        else{
            detailsCard.classList.remove("active");
        }
});
AddTransactionbtn.addEventListener('click', ShowModal);
balanceBtn.addEventListener('click', function(){
    ShowCard(1);
    // updateBalancebtn();
    updatebalance();
});
incomebtn.addEventListener('click', function(){
    ShowCard(2);
    updateincome();
});
expencebtn.addEventListener('click', function(){
    ShowCard(3);
    updateExpense();
});
savingbtn.addEventListener('click', function(){
    ShowCard(4);
    updateSaving();
});
function ShowCard(a){
    
    if(a === 1){
        detailsCard.className = "details-card balance-card";
        detailsCard.classList.add("active");
        detailsCard.innerHTML = `
        <h2>💰 Balance Details</h2>
    
        <div class="info">
            <span>Current Balance</span>
            <strong>₹0</strong>
        </div>
    
        <div class="info">
            <span>Total Income</span>
            <strong>₹0</strong>
        </div>
    
        <div class="info">
            <span>Total Expense</span>
            <strong>₹0</strong>
        </div>
        `;
    }
    else if(a === 2){
        detailsCard.className = "details-card income-card";
        detailsCard.classList.add("active");
        detailsCard.innerHTML = `
        <h2>📈 Income Details</h2>
    
        <div class="info">
            <span>Total Income</span>
            <strong>₹0</strong>
        </div>
    
        <div class="info">
            <span>Last Income</span>
            <strong>₹0</strong>
        </div>
    
        <div class="info">
            <span>Transactions</span>
            <strong>0</strong>
        </div>
        `;
    }
    else if(a === 3){
        detailsCard.className = "details-card expense-card";
        detailsCard.classList.add("active");
        detailsCard.innerHTML = `
        <h2>📉 Expense Details</h2>
       
        <div class="info">
            <span>Total Expense</span>
            <strong>₹0</strong>
        </div>
       
        <div class="info">
            <span>Last Expense</span>
            <strong>₹0</strong>
        </div>
       
        <div class="info">
            <span>Transactions</span>
            <strong>0</strong>
        </div>
        `;
    }
    else if(a === 4){
        detailsCard.className = "details-card savings-card";
        detailsCard.classList.add("active");
        detailsCard.innerHTML = `
        <h2>💵 Savings Details</h2>

        <div class="info">
            <span>Total Savings</span>
            <strong>₹0</strong>
        </div>
        
        <div class="info">
            <span>Savings Rate</span>
            <strong>0%</strong>
        </div>
        
        <div class="info goal-box">
            <span>Goal</span>
        
            <div class="goal-right">
                <strong class="goal-amount">₹0</strong>
                <button class="edit-goal">✏️</button>
            </div>
        </div>
        `;
    }
}
clsBtn.addEventListener('click', () => {
    modal.classList.remove("active");
});
function ShowModal(){
    modal.classList.add("active");
};
saveBtn.addEventListener('click', saveTransaction);
function saveTransaction(){
    const amt = amountInput.value;
    const category = categoryInput.value;
    const type = typeInput.value;
    const date = dateInput.value;
    const description = descriptionInput.value;
    if(Number(amt) <= 0){
        alert("Please enter a valid amount.");
        return;
    }
    if(category === ""){
        alert("Please select a category.");
        return;
    }
    if(type === ""){
        alert("Please select a type.");
        return;
    }
    if(date === ""){
        alert("Please select a date.");
        return;
    }
    if(description.trim() === ""){
        alert("Please enter a description.");
        return;
    }
    const transaction = {
      id: Date.now(),
      amount: Number(amt),
      category,
      type,
      date,
      description
    };
    if(editid === null){
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

    }
    else{
        transactions.forEach((transaction) => {
            if(transaction.id === editid){
               transaction.amount = Number(amt);
               transaction.category = categoryInput.value
               transaction.type  = typeInput.value
               transaction.date = dateInput.value;
               transaction.description = descriptionInput.value
               localStorage.setItem("transactions", JSON.stringify(transactions));
            }
        })
        editid = null;
    }
    amountInput.value = "";
    categoryInput.value = "";
    typeInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    renderTransaction();
    modal.classList.remove("active"); 
    
}
function renderTransaction(data = transactions){
      transactionHistory.innerHTML = "";
      if(data.length === 0){
        empty.style.display = "flex";

      }
    else{
        empty.style.display = "none";
       data.forEach((transaction) => {
        const card = document.createElement("div");
        card.classList.add(("transaction-card"));
        if(transaction.type === "Income"){
           card.classList.add("income-transaction");
        }
        else{
          card.classList.add("expense-transaction");
        }
        card.innerHTML = `
        <div class="card-top">
           <div class="left">
             <h1>${transaction.category}</h1>
             <p>${transaction.description}</p>
            </div>
            <div class="right">
               <h2>${transaction.amount}</h2>
            </div>
        </div>
        <div class="card-bottom">
          <span>${transaction.type}</span>
          <span>${transaction.date}</span>
        </div>
        <div class="card-actions">
          <div class="edit">✏ Edit</div>
          <div class="delete">🗑 Delete</div>
        </div>`
        const deleteBtn = card.querySelector(".delete");
        deleteBtn.addEventListener('click', function(){
            deleteTrans(transaction.id);
        });
        const editWork = card.querySelector(".edit");
        editWork.addEventListener('click', function(){
           editing(transaction.id);
        });
        transactionHistory.appendChild(card);
     })
     }
     updatebalance();
     updatePieChart();
}
function editing (id){
    editid = id;
    transactions.forEach((transaction) => {
           if(transaction.id === id){
              amountInput.value = transaction.amount;
              categoryInput.value = transaction.category;
              typeInput.value = transaction.type;
              dateInput.value = transaction.date;
              descriptionInput.value = transaction.description;
           }
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
    modal.classList.add("active");

}
function deleteTrans(id){
    transactions = transactions.filter(function(transaction){
        return transaction.id !== id;
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    renderTransaction();
}
function updatebalance(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currBalance = totalIncome - totalExpense;
    detailsCard.innerHTML =
    `<h2>💰 Balance Details</h2>
    
        <div class="info">
            <span>Current Balance</span>
            <strong>₹${currBalance}</strong>
        </div>
    
        <div class="info">
            <span>Total Income</span>
            <strong>₹${totalIncome}</strong>
        </div>
    
        <div class="info">
            <span>Total Expense</span>
            <strong>₹${totalExpense}</strong>
        </div>
        `;
}
function updateincome(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currIncome = totalIncome;
        detailsCard.innerHTML =`
        <h2>📈 Income Details</h2>
    
        <div class="info">
            <span>Total Income</span>
            <strong>₹${currIncome}</strong>
        </div>
    
        <div class="info">
            <span>Last Income</span>
            <strong>₹${currIncome}</strong>
        </div>
    
        <div class="info">
            <span>Transactions</span>
            <strong>${currIncome}</strong>
        </div>
        `;
}
function updateExpense(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currExpense = totalExpense;
    detailsCard.innerHTML = `
        <h2>📉 Expense Details</h2>
       
        <div class="info">
            <span>Total Expense</span>
            <strong>₹${currExpense}</strong>
        </div>
       
        <div class="info">
            <span>Last Expense</span>
            <strong>₹${currExpense}</strong>
        </div>
       
        <div class="info">
            <span>Transactions</span>
            <strong>${currExpense}</strong>
        </div>
        `;

}
function updateSaving(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currSavings = totalIncome - totalExpense;
    const rate = (currSavings/totalIncome) * 100;
    detailsCard.innerHTML = `
        <h2>💵 Savings Details</h2>

        <div class="info">
            <span>Total Savings</span>
            <strong>₹${currSavings}</strong>
        </div>
        
        <div class="info">
            <span>Savings Rate</span>
            <strong>${rate}%</strong>
        </div>
        
        <div class="info goal-box">
            <span>Goal</span>
        
            <div class="goal-right">
                <strong class="goal-amount">₹${SavingGoal}</strong>
                <button class="edit-goal">✏️</button>
            </div>
        </div>
        `;
        localStorage.setItem("transactions", JSON.stringify(transactions));
        const editGoalBtn = document.querySelector(".edit-goal");
        editGoalBtn.addEventListener('click', () => {
             console.log("clicked");
             SavingGoal = Number(prompt('enter your goal'));
             updateSaving();
             localStorage.setItem("SavingGoal", JSON.stringify(SavingGoal));
       });

}
function updateBalancebtn(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currBalance = totalIncome - totalExpense;
    balanceBtn.innerHTML = `
    💰Balance<br/>
    <strong>₹${currBalance}</strong>`
}
function updateExpensebtn(){
   let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currExpense = totalExpense;  
    expencebtn.innerHTML = `
    📈Expense<br /><strong>₹${currExpense}</strong>` 
}
function updateIncomebtn(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currIncome = totalIncome;
    incomebtn.innerHTML = `📈Income<br /><strong>₹${totalIncome}</strong>`
}
function updateSavingbtn(){
    let  totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
        if(transaction.type === "Income"){
            totalIncome += Number(transaction.amount);
        }
        else if(transaction.type === "Expense"){
            totalExpense += Number(transaction.amount);
        }
    });
    const currSavings = totalIncome - totalExpense;
    savingbtn.innerHTML = `💵Savings<br /><strong>₹${currSavings}</strong>`
}
function updatePieChart() {
    console.log("myChart")
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "Income") {
            totalIncome += Number(transaction.amount);
        } else {
            totalExpense += Number(transaction.amount);
        }
    });
    const currExpense = totalExpense;  
    const currSavings = totalIncome - totalExpense;
    const currIncome = totalIncome;
     if(transactions.length === 0){
        document.getElementById("myChart").style.display = "none";
        chartEmpty.style.display = "flex";
        return;
    }
    chartEmpty.style.display = "none";
    document.getElementById("myChart").style.display = "block";
    myChart.data.datasets[0].data = [
        totalIncome,
        totalExpense,
        currSavings
    ];

    myChart.update();
}
function updateSummary(){
    console.log("myChart")
    let totalIncome = 0;
    let totalExpense = 0;
    const Transactions = transactions.length;
    transactions.forEach((transaction) => {
        if (transaction.type === "Income") {
            totalIncome += Number(transaction.amount);

        } else {
            totalExpense += Number(transaction.amount);
        }
    });
    const currExpense = totalExpense;  
    const currSavings = totalIncome - totalExpense;
    const currIncome = totalIncome;
    summary.innerHTML = `
     <h2>📋 Summary</h2>

        <div class="item">
            <span>Total Transactions</span>
            <strong>${Transactions}</strong>
        </div>

        <div class="item">
            <span>Total Income</span>
            <strong>₹0${currIncome}</strong>
        </div>

        <div class="item">
            <span>Total Expense</span>
            <strong>₹${currExpense}</strong>
        </div>

        <div class="item">
            <span>Total Savings</span>
            <strong>₹${currSavings}</strong>
        </div>
    </div>
    `;
}
function searching(){
    const Inputvalue = search.value.toLowerCase().trim();
    const compareVal = categoryInput.value;
    if(Inputvalue === ""){
       renderTransaction();
       return;
    }
    const filtered = transactions.filter((transaction) => {
        
            return transaction.category.toLowerCase().includes(Inputvalue);

    });
    renderTransaction(filtered);
    
}
function sorting(){
    const sorted = [...transactions];
    const selectval = sort.value;
    if(selectval === "newest"){
        sorted.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
    }else if(selectval === "oldest"){
        sorted.sort((a,b) => {
            return new Date(a.date) - new Date(b.date);
        })
    }
    else if(selectval === "highest"){
        sorted.sort((a,b) => {
            return b.amount - a.amount;
        });
    }
    else if(selectval === "lowest"){
        sorted.sort((a, b) => {
            return a.amount - b.amount;
        })
    }

    renderTransaction(sorted);
}
function filtering(){
    const userfilter = filters.value

    if(userfilter === "Filter"){
        renderTransaction();
        return;
    }
    const slelected = transactions.filter((transaction) => {
        return transaction.category === userfilter;
    });
    
    renderTransaction(slelected);
}
