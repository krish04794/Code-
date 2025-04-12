// DOM Elements
const addTransactionBtn = document.getElementById('addTransactionBtn');
const transactionModal = document.getElementById('transactionModal');
const closeTransactionModal = document.getElementById('closeTransactionModal');
const transactionForm = document.getElementById('transactionForm');
const dashboardOverview = document.getElementById('dashboardOverview');
const transactionsSection = document.getElementById('transactionsSection');
const dashboardMenuItem = document.getElementById('dashboardMenuItem');
const transactionsMenuItem = document.getElementById('transactionsMenuItem');

// Modal Functions
function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Toggle between Dashboard and Transactions
function showDashboard() {
    dashboardOverview.classList.remove('hidden-section');
    dashboardOverview.classList.add('visible-section');
    transactionsSection.classList.remove('visible-section');
    transactionsSection.classList.add('hidden-section');
    
    // Update menu item active states
    dashboardMenuItem.classList.add('active');
    transactionsMenuItem.classList.remove('active');
}

function showTransactions() {
    dashboardOverview.classList.remove('visible-section');
    dashboardOverview.classList.add('hidden-section');
    transactionsSection.classList.remove('hidden-section');
    transactionsSection.classList.add('visible-section');
    
    // Update menu item active states
    dashboardMenuItem.classList.remove('active');
    transactionsMenuItem.classList.add('active');
}

// Event Listeners
addTransactionBtn.addEventListener('click', () => openModal(transactionModal));
closeTransactionModal.addEventListener('click', () => closeModal(transactionModal));
dashboardMenuItem.addEventListener('click', showDashboard);
transactionsMenuItem.addEventListener('click', showTransactions);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === transactionModal) closeModal(transactionModal);
});

// Form Submission
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('transactionTitle').value;
    const amount = document.getElementById('transactionAmount').value;
    const type = document.querySelector('input[name="transactionType"]:checked').value;
    const category = document.getElementById('transactionCategory').value;
    const date = document.getElementById('transactionDate').value;
    
    // In a real app, you would save this transaction to your database
    alert(`Transaction added: ${title} - $${amount} (${type})`);
    
    // Close modal and reset form
    closeModal(transactionModal);
    transactionForm.reset();
});

// Initialize Charts
document.addEventListener('DOMContentLoaded', () => {
    // Income vs Expense Chart
    const incomeExpenseCtx = document.getElementById('incomeExpenseChart').getContext('2d');
    const incomeExpenseChart = new Chart(incomeExpenseCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Income',
                    data: [1200, 1900, 1500, 1800, 2100, 1900],
                    backgroundColor: '#10b981',
                    borderRadius: 6
                },
                {
                    label: 'Expense',
                    data: [800, 1200, 1000, 1100, 1400, 1200],
                    backgroundColor: '#ef4444',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });

    // Set today's date as default in the form
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('transactionDate').value = formattedDate;
    
    // Initialize menu items
    dashboardMenuItem.classList.add('active');
});