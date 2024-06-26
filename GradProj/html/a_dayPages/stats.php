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
$sql = "SELECT * FROM meals WHERE user_id='$user_id' AND date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ORDER BY date";
$result = $conn->query($sql);

$meals = [];
while ($row = $result->fetch_assoc()) {
    $meals[] = $row;
}

$sql = "SELECT weight FROM users WHERE id='$user_id'";
$result = $conn->query($sql);
$user = $result->fetch_assoc();
$initial_weight = $user['weight'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Stats</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        .container {
            width: 50%;
            margin: 0 auto;
        }

        nav {
            margin-top: 20px;
        }

        nav a {
            margin-right: 10px;
        }

        .backbtn {
            position: fixed;
            top: 0;
            margin-top: 30px;
            margin-left: 30px;
            background-color: #007705;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
        }
        .backbtn:hover{
            background-color: gray;
        }    
    </style>
</head>

<body>
    <a href="dashboard.php" class="backbtn">Back</a>
    <div class="container">
        <h1>Stats</h1>
        <nav>
            <a href="dashboard.php">Dashboard</a>
            <a href="logout.php">log out</a>
        </nav>
        <canvas id="caloriesChart"></canvas>
        <script>
            const ctx = document.getElementById('caloriesChart').getContext('2d');
            const caloriesData = <?php echo json_encode($meals); ?>;
            const labels = caloriesData.map(meal => meal.date);
            const data = caloriesData.map(meal => meal.calories);
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Daily Calorie Intake',
                        data: data,
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
    </div>
</body>

</html>
<?php $conn->close(); ?>