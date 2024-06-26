<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calorie_tracker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $weight = $_POST['weight'];
    $height = $_POST['height'];
    $weight_goal = $_POST['weight_goal'];

    // Check if username already exists
    $sql = "SELECT * FROM users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $error_message = "Username already exists. Please choose a different username.";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, password, weight, height, weight_goal) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdds", $username, $hashed_password, $weight, $height, $weight_goal);

        if ($stmt->execute()) {
            header("Location: login.php");
            exit();
        } else {
            $error_message = "Error: " . $stmt->error;
        }
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="log-reg.css">
    <style>
        /* Add your CSS styling here */
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('register-form').addEventListener('submit', function (e) {
                const username = document.getElementById('new-username').value;
                const password = document.getElementById('new-password').value;

                const usernamePattern = /^[a-zA-Z0-9]{3,15}$/;
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

                if (!usernamePattern.test(username)) {
                    alert('Username must be 3-15 characters long and contain only letters and numbers.');
                    e.preventDefault();
                }

                if (!passwordPattern.test(password)) {
                    alert('Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
                    e.preventDefault();
                }
            });
        });
    </script>
</head>

<body>
<span style="width: 100px; left: 0; top: 0; position: fixed; margin:20px;border-radius:4px; "> <a href="main.html"><button
                style=" background-color: rgb(81, 203, 13);">Back</button></a></span>
    <div class="container">
        <h1>Register for Calorie Tracker</h1>
        <?php
        if (isset($error_message)) {
            echo "<p class='error-message'>$error_message</p>";
        }
        ?>
        <div class="form-container">
            <form id="register-form" action="register.php" method="post">
                <h2>Register</h2>
                <input type="text" id="new-username" name="username" placeholder="Username" required><br>
                <input type="password" id="new-password" placeholder="Password" name="password" required><br>
                <input type="number" id="weight" name="weight" placeholder="Weight (kg)" min="10" max="700" required><br>
                <input type="number" id="height" name="height" placeholder="Height (cm)" min="55" max="220" required><br>
                <input type="number" id="weight_goal" placeholder="Weight Goal (kg)" name="weight_goal" min="0" required><br>
                <button type="submit" class="button">Register</button>
            </form>
        </div>
        <p style="color:black;">Already have an account? <a href="login.php">Login here</a></p>
    </div>
</body>

</html>
