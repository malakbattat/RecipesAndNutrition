<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calorie_tracker";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            header("Location: dashboard.php");
            exit();
        } else {
            $error_message = "Invalid password.";
        }
    } else {
        $error_message = "No user found.";
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="log-reg.css">
    <style>
        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            background-color: #e8f5e9; /* Light green background */
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: #fff; /* White background for the container */
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
        }

        h1 {
            color: #388e3c; /* Dark green for headings */
            margin-bottom: 20px;
        }

        .form-container {
            margin-bottom: 20px;
        }

        input {
            padding: 15px;
            width: 100%;
            margin-bottom: 20px;
            border: 1px solid #a5d6a7; /* Light green border */
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
        }

        .button {
            padding: 15px;
            width: 100%;
            border: none;
            border-radius: 5px;
            background-color: #4caf50; /* Green button */
            color: white;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .button:hover {
            background-color: #388e3c; /* Darker green on hover */
        }

        p {
            font-size: 16px;
            color: #666;
            margin-top: 20px;
        }

        a {
            color: #388e3c; /* Green link color */
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .error-message {
            color: red;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Login to Calorie Tracker</h1>
        <div class="form-container">
            <?php
            if (isset($error_message)) {
                echo "<p class='error-message'>$error_message</p>";
            }
            ?>
            <form id="login-form" action="login.php" method="post">
                <h2>Login</h2>
                <input type="text" name="username" placeholder="Username" required><br>
                <input type="password" name="password" placeholder="Password" required><br>
                <button class="button" type="submit">Login</button>
            </form>
        </div>
        <p>Don't have an account? <a href="register.php">Register here</a></p>
    </div>
</body>

</html>
