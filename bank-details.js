// DOM Elements
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
const bankDetailsForm = document.getElementById('bankDetailsForm');
const ntlBtn = document.getElementById('ntlBtn');

// Modal Functions (same as before)
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

// Event Listeners (same as before plus new ones)
loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));
closeLoginModal.addEventListener('click', () => closeModal(loginModal));
closeSignupModal.addEventListener('click', () => closeModal(signupModal));

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    setTimeout(() => {
        openModal(signupModal);
    }, 300);
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    setTimeout(() => {
        openModal(loginModal);
    }, 300);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// Form Submissions (same as before)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    alert(`Login attempt with email: ${email}`);
    closeModal(loginModal);
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    alert(`Signup attempt for ${name} with email: ${email}`);
    closeModal(signupModal);
});

// Bank Details Form Submission
bankDetailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const bankName = document.getElementById('bankName').value;
    const ifscCode = document.getElementById('ifscCode').value;
    
    alert(`Bank account connection request for ${fullName}, account number: ${accountNumber}`);
    // In real app, would redirect to dashboard
    window.location.href = 'dashboard.html';
});

// NTL (No Transaction Linking) Button
ntlBtn.addEventListener('click', () => {
    // In real app, would redirect to dashboard without bank connection
    alert('Proceeding without bank account linking. You can add transactions manually.');
    window.location.href = 'dashboard.html';
});

// Header Scroll Effect (same as before)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1rem 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1.5rem 0';
    }
});