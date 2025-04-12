// ===== Code from script1.js =====

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    // Check if preloader exists before manipulating
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// General Modal Functions (will be reused/potentially conflict)
function openModal(modal) {
    if (modal) { // Check if modal element exists
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    } else {
        console.warn("Attempted to open a non-existent modal.");
    }
}

function closeModal(modal) {
    if (modal) { // Check if modal element exists
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    } else {
        console.warn("Attempted to close a non-existent modal.");
    }
}


// DOM Elements for Landing Page / General Modals
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const exploreBtn = document.getElementById('exploreBtn');

// Event Listeners for Landing Page Modals (Check if elements exist first)
if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
if (signupBtn) signupBtn.addEventListener('click', () => openModal(signupModal));
if (closeLoginModal) closeLoginModal.addEventListener('click', () => closeModal(loginModal));
if (closeSignupModal) closeSignupModal.addEventListener('click', () => closeModal(signupModal));

if (showSignup) {
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        setTimeout(() => {
            openModal(signupModal);
        }, 300);
    });
}

if (showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        setTimeout(() => {
            openModal(loginModal);
        }, 300);
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    // Check if modals exist before comparing target
    if (loginModal && e.target === loginModal) closeModal(loginModal);
    if (signupModal && e.target === signupModal) closeModal(signupModal);
    // Add check for transactionModal if needed globally
    const transactionModalGlobal = document.getElementById('transactionModal');
    if (transactionModalGlobal && e.target === transactionModalGlobal) closeModal(transactionModalGlobal);
});

// Form Submissions for Landing Page Modals
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        if (emailInput && passwordInput) {
             const email = emailInput.value;
             const password = passwordInput.value; // In a real app, don't log password
             alert(`Login attempt with email: ${email}`);
             closeModal(loginModal);
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('signupName');
        const emailInput = document.getElementById('signupEmail');
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('signupConfirmPassword');

        if (nameInput && emailInput && passwordInput && confirmPasswordInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            
            alert(`Signup attempt for ${name} with email: ${email}`);
            closeModal(signupModal);
        }
    });
}

// Explore Button Action
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        // Make sure 'bank-details.html' exists or change the destination
        window.location.href = 'bank-details.html'; 
    });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) { // Check if header exists
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '1rem 0'; // This might conflict with dashboard header styles
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '1.5rem 0'; // This might conflict with dashboard header styles
        }
    }
});

// Animate elements on scroll (Landing page specific)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-content, .hero-image');
    
    if (elements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Optional: stop observing once animated
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
};

// Initialize landing page animations (Run only once on DOM load)
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Bank Details Form Submission (Assuming this runs on bank-details.html page)
// Added checks to ensure it only runs if the form exists
const bankDetailsForm = document.getElementById('bankDetailsForm');
const ntlBtn = document.getElementById('ntlBtn');

if (bankDetailsForm && ntlBtn) {
    bankDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullNameInput = document.getElementById('fullName');
        const accountNumberInput = document.getElementById('accountNumber');
        // Add checks for other inputs if needed
        if (fullNameInput && accountNumberInput) {
            const fullName = fullNameInput.value;
            const accountNumber = accountNumberInput.value;
            // const bankName = document.getElementById('bankName').value;
            // const ifscCode = document.getElementById('ifscCode').value;
            
            alert(`Bank account connection request for ${fullName}, account number: ${accountNumber}`);
            window.location.href = 'dashboard.html'; // Ensure dashboard.html exists
        }
    });
    
    ntlBtn.addEventListener('click', () => {
        alert('Proceeding without bank account linking. You can add transactions manually.');
        window.location.href = 'dashboard.html'; // Ensure dashboard.html exists
    });
}

// ===== Code from dashboard.js =====

// DOM Elements for Dashboard
const addTransactionBtn = document.getElementById('addTransactionBtn');
const transactionModal = document.getElementById('transactionModal'); // Already declared, potentially conflicting
const closeTransactionModal = document.getElementById('closeTransactionModal'); // Already declared? No, specific ID
const transactionForm = document.getElementById('transactionForm'); // Already declared, potentially conflicting
const dashboardOverview = document.getElementById('dashboardOverview');
const transactionsSection = document.getElementById('transactionsSection');
const dashboardMenuItem = document.getElementById('dashboardMenuItem');
const transactionsMenuItem = document.getElementById('transactionsMenuItem');
const incomeExpenseChartElement = document.getElementById('incomeExpenseChart');

// Toggle between Dashboard and Transactions (Dashboard specific)
function showDashboard() {
    // Check if elements exist before manipulating
    if (dashboardOverview && transactionsSection && dashboardMenuItem && transactionsMenuItem) {
        dashboardOverview.classList.remove('hidden-section');
        dashboardOverview.classList.add('visible-section');
        transactionsSection.classList.remove('visible-section');
        transactionsSection.classList.add('hidden-section');
        
        // Update menu item active states
        dashboardMenuItem.classList.add('active');
        transactionsMenuItem.classList.remove('active');
    }
}

function showTransactions() {
     // Check if elements exist before manipulating
    if (dashboardOverview && transactionsSection && dashboardMenuItem && transactionsMenuItem) {
        dashboardOverview.classList.remove('visible-section');
        dashboardOverview.classList.add('hidden-section');
        transactionsSection.classList.remove('hidden-section');
        transactionsSection.classList.add('visible-section');
        
        // Update menu item active states
        dashboardMenuItem.classList.remove('active');
        transactionsMenuItem.classList.add('active');
    }
}

// Event Listeners for Dashboard (Check if elements exist)
if (addTransactionBtn) addTransactionBtn.addEventListener('click', () => openModal(transactionModal));
if (closeTransactionModal) closeTransactionModal.addEventListener('click', () => closeModal(transactionModal));
if (dashboardMenuItem) dashboardMenuItem.addEventListener('click', showDashboard);
if (transactionsMenuItem) transactionsMenuItem.addEventListener('click', showTransactions);

// Form Submission for Transaction Modal (Check if form exists)
if (transactionForm) {
    // It's possible the listener from script1.js is already attached.
    // To avoid duplicate alerts, we might need a flag or remove previous listener.
    // For simplicity here, we just add the listener, assuming only one form with this ID exists per page.
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleInput = document.getElementById('transactionTitle');
        const amountInput = document.getElementById('transactionAmount');
        const typeInput = document.querySelector('input[name="transactionType"]:checked');
        const categoryInput = document.getElementById('transactionCategory');
        const dateInput = document.getElementById('transactionDate');

        if (titleInput && amountInput && typeInput && categoryInput && dateInput) {
            const title = titleInput.value;
            const amount = amountInput.value;
            const type = typeInput.value;
            const category = categoryInput.value;
            const date = dateInput.value;
            
            // In a real app, you would save this transaction
            alert(`Transaction added: ${title} - $${amount} (${type}) on ${date}`);
            
            // Close modal and reset form
            closeModal(transactionModal); // Assumes transactionModal is the correct modal instance
            transactionForm.reset();

             // Set date back to today after reset if needed
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            if (dateInput) dateInput.value = formattedDate;
        }
    });
}

// Initialize Charts (Run only if chart element exists)
function initializeDashboard() {
    if (incomeExpenseChartElement) {
        const incomeExpenseCtx = incomeExpenseChartElement.getContext('2d');
        // Check if Chart object is available (CDN loaded)
        if (typeof Chart !== 'undefined') {
            const incomeExpenseChart = new Chart(incomeExpenseCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Sample data
                    datasets: [
                        {
                            label: 'Income',
                            data: [1200, 1900, 1500, 1800, 2100, 1900], // Sample data
                            backgroundColor: '#10b981',
                            borderRadius: 6
                        },
                        {
                            label: 'Expense',
                            data: [800, 1200, 1000, 1100, 1400, 1200], // Sample data
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
                            display: false // Legend handled by custom HTML
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
        } else {
             console.error("Chart.js library not loaded.");
        }
    }

    // Set today's date as default in the transaction form
    const transactionDateInput = document.getElementById('transactionDate');
    if (transactionDateInput) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        transactionDateInput.value = formattedDate;
    }
    
    // Initialize menu items active state and initial view
    if (dashboardMenuItem && transactionsSection) {
        // Default to showing the dashboard overview
       showDashboard();
    } else if (transactionsMenuItem && dashboardOverview) {
         // If dashboard overview doesn't exist, maybe default to transactions?
         // Or handle based on URL hash, etc.
         // For now, we assume dashboard overview is the default if available.
         if (!dashboardOverview) {
             showTransactions();
         } else {
             showDashboard(); // Default if both exist
         }
    }
}

// Run dashboard initialization logic only when DOM is ready
// This helps ensure elements are available
document.addEventListener('DOMContentLoaded', initializeDashboard);