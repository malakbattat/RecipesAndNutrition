<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "meal_tracker");
$user_id = $_SESSION["user_id"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $meal_name = $_POST["meal_name"];
    $meal_type = $_POST["meal_type"];
    $calories = $_POST["calories"];
    $meal_date = date("Y-m-d");

    $sql = "INSERT INTO meals (user_id, meal_name, meal_type, calories, meal_date) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issis", $user_id, $meal_name, $meal_type, $calories, $meal_date);

    if ($stmt->execute()) {
        echo "Meal added successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
<a href="dashboard.php">Back to Dashboard</a>
