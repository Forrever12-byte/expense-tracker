let expenses = [];

const list = document.getElementById("list");
const total = document.getElementById("total");
const form = document.getElementById("form");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const categorySelect = document.getElementById("categories");
const filterSelect = document.getElementById("filter");
let selectedCategory = "all"

function render() {
    list.innerHTML = "";

    const visibleExpenses = selectedCategory === "all" ? expenses : expenses.filter(expense => expense.category === selectedCategory);

    for(let i = 0; i < visibleExpenses.length; i++) {

       const li = document.createElement("li");
       const id = visibleExpenses[i].id;
       const info = document.createElement("div");
        info.classList.add("expense-info");

        const nameSpan = document.createElement("span");
        nameSpan.textContent = visibleExpenses[i].name;
        nameSpan.classList.add("expense-name");

        const categorySpan = document.createElement("span");
        categorySpan.textContent = visibleExpenses[i].category;
        categorySpan.classList.add("expense-category");

        const amountSpan = document.createElement("span");
        amountSpan.textContent = `₦${visibleExpenses[i].amount}`;
        amountSpan.classList.add("expense-amount");

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.classList.add("delete-btn");

        info.append(nameSpan, categorySpan);
        li.append(info, amountSpan, button);
        list.append(li);

       button.addEventListener('click', () => {

            expenses = expenses.filter(expense => expense.id !== id);

            render();

       })
        
    }

    const sum = expenses.reduce((running, expense) => running + expense.amount, 0);
    total.textContent = `Total: ₦${sum}`;

}

render();

filterSelect.addEventListener('change', () => {

    selectedCategory = filterSelect.value;

    render();

});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const expense = expenseName.value.trim();
    const category = categorySelect.value;
    const amount = Number(expenseAmount.value);

    if(!expense || !category || amount <= 0) {return;}

    const newObject = {id: Date.now(), name: expense, amount: amount, category: category};

    expenses.push(newObject);

    render();

    form.reset();
});