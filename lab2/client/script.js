// URLs for the backend
const signupUrl = 'http://localhost:3000/signup';
const loginUrl = 'http://localhost:3000/login';
const logoutUrl = 'http://localhost:3000/logout';
const authUrl = 'http://localhost:3000/auth'

// Get form elements
const signupForm = document.getElementById('signup');
const loginForm = document.getElementById('login');
const logoutForm = document.getElementById('logoutForm');

async function setEmail() {
    try {
        const response = await fetch(authUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token"),
            }
        });

        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }

        const data = await response.json();
        localStorage.setItem("email", data.sub);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Sign Up event listener
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Signup failed');
            });
        }
        alert('Signup successful! Please log in.');
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Something went wrong. Try again please");
    });
});

// Login event listener
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ "email": email, "password": password })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Login failed');
        }

        const data = await response.json();
        alert('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', data.admin);
        await setEmail();
        location.reload();
    } catch (error) {
        console.error('Error:', error);
        alert("Щось пішло не так. Спробуйте ще раз");
    }
});

// Logout event listener
document.getElementById('logoutButton').addEventListener('click', function () {
    if(localStorage.getItem("token")) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('email');

        alert('Logged out successfully!');
        location.reload();
    } else {
        alert("You were not logged in");
    }
});

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const email = localStorage.getItem('email');
    const is_admin = localStorage.getItem('admin');

    if (email) {
        document.getElementById('logoutForm').style.display = 'block'; // Показати форму logout
        document.getElementById('emailDisplay').textContent = `Logged in as: ${email}`;
    }
    if(is_admin === "true") {
        document.getElementById('adminButton').style.display = 'block';
    }
});

// Admin button event listener
document.getElementById('adminButton').addEventListener('click', function () {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
    
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
    
        const particleCount = 50 * (timeLeft / duration);
    
        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
});
