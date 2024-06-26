<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calorie_tracker";

$conn = new mysqli($servername, $username, $password, $dbname);

$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id='$user_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();

$weight_goal = $user['weight_goal'];
$current_weight = $user['weight'];

$date = date('Y-m-d');
$month_ago = date('Y-m-d', strtotime('-1 month'));

// Fetch daily calories data
$sql = "SELECT date, SUM(calories) as total_calories FROM meals WHERE user_id='$user_id' AND date BETWEEN '$month_ago' AND '$date' GROUP BY date";
$result = $conn->query($sql);

$daily_calories = [];
while ($row = $result->fetch_assoc()) {
    $daily_calories[$row['date']] = $row['total_calories'];
}

$total_calories = array_sum($daily_calories);
$average_daily_calories = $total_calories / 30;

// Calculate weight change estimate (assuming 7700 calories per kg)
$weight_change = $total_calories / 7700;
$projected_weight = $current_weight - $weight_change;

$on_track = ($projected_weight <= $weight_goal);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Goal Stats</title>
    <style>
        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        .container {
            width: 50%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #388e3c;
        }
        .alert {
            color: #d32f2f;
        }
        nav a {
            margin-right: 10px;
            text-decoration: none;
            color: #388e3c;
        }
        nav a:hover {
            text-decoration: underline;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <h1>Goal Stats</h1>
        <nav>
            <a href="dashboard.php">Dashboard</a>
            <a href="stats.php">Stats</a>
            <a href="goal_stats.php">Goal Stats</a>
            <a href="profile.php">Profile</a>
            <a href="logout.php">Log out</a>
        </nav>
  <?php       // profile.php (for example)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Other profile fields
    $weight_goal = $_POST['weight_goal'];
    
    $sql = "UPDATE users SET weight_goal='$weight_goal' WHERE id='$user_id'";
    $conn->query($sql);
}
?>

<form action="profile.php" method="post">
    <!-- Other profile fields -->
    Weight Goal: <input type="number" step="0.1" name="weight_goal" value="<?php echo $user['weight_goal']; ?>" required><br>
    <input type="submit" value="Update Profile">
</form>

        
        <h2>Your Weight Goal Progress</h2>
        <p>Current Weight: <?php echo $current_weight; ?> kg</p>
        <p>Weight Goal: <?php echo $weight_goal; ?> kg</p>
        <p>Projected Weight in a Month: <?php echo number_format($projected_weight, 2); ?> kg</p>
        <p>Average Daily Calorie Intake: <?php echo number_format($average_daily_calories, 2); ?> calories</p>
        <?php if ($on_track): ?>
            <p>You are on track to reach your weight goal!</p>
        <?php else: ?>
            <p class="alert">You need to adjust your calorie intake to reach your weight goal.</p>
        <?php endif; ?>
        <h2>Daily Calorie Intake</h2>
        <canvas id="calorieChart" width="400" height="200"></canvas>
    </div>
    <script>
        const ctx = document.getElementById('calorieChart').getContext('2d');
        const data = {
            labels: <?php echo json_encode(array_keys($daily_calories)); ?>,
            datasets: [{
                label: 'Total Calories',
                data: <?php echo json_encode(array_values($daily_calories)); ?>,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Calories'
                        }
                    }
                }
            }
        };
        const calorieChart = new Chart(ctx, config);
    </script>
</body>
</html>
<?php $conn->close(); ?>
