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
let SavingGoal = 0;
let editid = null;
let transactions = [];
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
    }
    else{
        transactions.forEach((transaction) => {
            if(transaction.id === editid){
               transaction.amount = Number(amt);
               transaction.category = categoryInput.value
               transaction.type  = typeInput.value
               transaction.date = dateInput.value;
               transaction.description = descriptionInput.value
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
function renderTransaction(){
      transactionHistory.innerHTML = "";
      if(transactions.length === 0){
        empty.style.display = "flex";
        return;
      }
     empty.style.display = "none";
     transactions.forEach((transaction) => {
        const card = document.createElement("div");
        ca
        rd.classList.add(("transaction-card"));
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
     updatebalance();

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
    modal.classList.add("active");
}
function deleteTrans(id){
    transactions = transactions.filter(function(transaction){
        return transaction.id !== id;
    });

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
        const editGoalBtn = document.querySelector(".edit-goal");
        editGoalBtn.addEventListener('click', () => {
             console.log("clicked");
             SavingGoal = Number(prompt('enter your goal'));
             updateSaving();
       });

}