// User Data
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Function to handle login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'calorie_tracker.html';
    } else {
        alert('Invalid login credentials');
    }
});

// Function to handle registration
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    if (users[username]) {
        alert('Username already exists');
    } else {
        users[username] = { username, password, weight, height, records: [] };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
    }
});

// Function to calculate daily calories
document.getElementById('calorie-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const breakfast = parseInt(document.getElementById('breakfast').value);
    const lunch = parseInt(document.getElementById('lunch').value);
    const dinner = parseInt(document.getElementById('dinner').value);

    const totalCalories = breakfast + lunch + dinner;
    const summary = document.getElementById('summary');

    let bmr = 10 * currentUser.weight + 6.25 * currentUser.height - 5 * 30 + 5; // Simplified BMR calculation for example

    let message = '';
    if (totalCalories > bmr) {
        message = 'You have gained weight today.';
    } else {
        message = 'You have lost weight today.';
    }

    summary.textContent = `Total Calories: ${totalCalories}. ${message}`;

    const today = new Date().toISOString().split('T')[0];
    currentUser.records.push({ date: today, calories: totalCalories });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    updateSummaryTable();
});

// Function to update summary table
function updateSummaryTable() {
    const tableBody = document.getElementById('summary-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    currentUser.records.forEach(record => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const caloriesCell = document.createElement('td');
        dateCell.textContent = record.date;
        caloriesCell.textContent = record.calories;
        row.appendChild(dateCell);
        row.appendChild(caloriesCell);
        tableBody.appendChild(row);
    });
}

// Initialize table on load
if (document.getElementById('summary-table')) {
    updateSummaryTable();
}

// Cookie Management
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (currentUser) {
    setCookie('currentUser', JSON.stringify(currentUser), 30);
} else {
    const cookieUser = getCookie('currentUser');
    if (cookieUser) {
        currentUser = JSON.parse(cookieUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}







document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes('Invalid login credentials')) {
            alert('Invalid login credentials');
        } else {
            window.location.href = 'calorie_tracker.php';
        }
    });
});

document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data.includes('Registration successful')) {
            document.getElementById('register-form').reset();
        }
    });
});
