<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}

$conn = new mysqli("localhost", "root", "", "meal_tracker");
$user_id = $_SESSION["user_id"];

$user_data = $conn->query("SELECT weight, height, registration_date FROM users WHERE id = $user_id")->fetch_assoc();
$registration_date = $user_data["registration_date"];

$result = $conn->query("SELECT meal_date, SUM(calories) as total_calories FROM meals WHERE user_id = $user_id GROUP BY meal_date");

$dates = [];
$calories = [];
while ($row = $result->fetch_assoc()) {
    $dates[] = $row["meal_date"];
    $calories[] = $row["total_calories"];
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Stats</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>Stats</h1>
    <canvas id="myChart" width="400" height="200"></canvas>
    <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: <?php echo json_encode($dates); ?>,
                datasets: [{
                    label: 'Calories Intake',
                    data: <?php echo json_encode($calories); ?>,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
    <a href="dashboard.php">Back to Dashboard</a>
</body>
</html>
