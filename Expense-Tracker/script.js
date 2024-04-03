let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update summary table
function updateSummaryTable() {
    const summaryTableBody = document.getElementById('summary-table-body');
    summaryTableBody.innerHTML = '';

    const summaryMap = new Map();
    for (const expense of expenses) {
        if (!summaryMap.has(expense.category)) {
            summaryMap.set(expense.category, expense.amount);
        } else {
            summaryMap.set(expense.category, summaryMap.get(expense.category) + expense.amount);
        }
    }

    let totalCost = 0;
    for (const [category, totalExpense] of summaryMap) {
        const newRow = summaryTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const totalExpenseCell = newRow.insertCell();
        categoryCell.textContent = category;
        totalExpenseCell.textContent = totalExpense;
        totalCost += totalExpense;
    }

    document.getElementById('total-cost').textContent = totalCost;
}

// Add an expense
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }
    expenses.push({ category, amount, date });

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
        updateSummaryTable(); // Update summary table after deletion
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    updateSummaryTable(); // Update summary table after addition
});

// Initialize summary table and total cost on page load
updateSummaryTable();