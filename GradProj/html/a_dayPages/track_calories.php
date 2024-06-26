<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "meal_tracker");
$user_id = $_SESSION["user_id"];

$result = $conn->query("SELECT meal_date, SUM(calories) as total_calories FROM meals WHERE user_id = $user_id GROUP BY meal_date");

echo "<h1>Monthly Calories Intake</h1>";
while ($row = $result->fetch_assoc()) {
    echo "Date: " . $row["meal_date"] . " - Total Calories: " . $row["total_calories"] . "<br>";
}
?>
<a href="dashboard.php">Back to Dashboard</a>
