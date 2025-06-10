 const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const balanceDisplay = document.getElementById("balance");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let balance = 0;

  expenses.forEach((expense, index) => {
    balance += Number(expense.amount);

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.description} - $${Number(expense.amount).toFixed(2)}
      <span onclick="deleteExpense(${index})">❌</span>
    `;
    expenseList.appendChild(li);
  });

  balanceDisplay.textContent = balance.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateLocalStorage();
  renderExpenses();
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (description && !isNaN(amount)) {
    expenses.push({ description, amount });
    updateLocalStorage();
    renderExpenses();
    descriptionInput.value = "";
    amountInput.value = "";
  }
});

renderExpenses();
