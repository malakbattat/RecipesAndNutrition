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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['meal_name'])) {
    $meal_name = $_POST['meal_name'];
    $meal_type = $_POST['meal_type'];
    $calories = $_POST['calories'];
    $date = date('Y-m-d');

    $sql = "INSERT INTO meals (user_id, meal_name, meal_type, calories, date) VALUES ('$user_id', '$meal_name', '$meal_type', '$calories', '$date')";
    $conn->query($sql);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['delete_meal_id'])) {
    $meal_id = $_POST['delete_meal_id'];

    $sql = "DELETE FROM meals WHERE id='$meal_id' AND user_id='$user_id'";
    $conn->query($sql);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="dash.css">
</head>

<body>
    <header class="header">
        <img src="../assets/images/logo/Find_a_Recipe.png" alt="Logo">
        <nav>
            <a href="../index.html">Home</a>
            <a href="dashboard.php">Dashboard</a>
            <a href="stats.php">Stats</a>
            <a href="weight_goal_stats.php">Weight Goal Stats</a>
            <a href="logout.php">Log out</a>
        </nav>
    </header>
    <div class="container">
        <h1>Welcome, <?php echo $user['username']; ?>!</h1>
        <h2>Log Your Meal</h2>
        <form action="dashboard.php" method="post">
            <label for="meal_name">Meal Name:</label>
            <input type="text" id="meal_name" name="meal_name" required><br>
            <label for="meal_type">Meal Type:</label>
            <select id="meal_type" name="meal_type" required>
                <option value="">-- Select --</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select><br>
            <label for="calories">Calories Approx.:</label>
            <input type="number" id="calories" min="0" name="calories" required><br>
            <button type="button" class="calHint" onclick="location.href ='../calculate.html'">Calories Guide</button><br>
            <br><br><input type="submit" value="Add Meal">
        </form>
        <h2>Your Meals Today</h2>
        <?php
        $date = date('Y-m-d');
        $sql = "SELECT * FROM meals WHERE user_id='$user_id' AND date='$date'";
        $result = $conn->query($sql);
        $total_calories = 0;

        if ($result->num_rows > 0) {
            echo "<ul>";
            while ($row = $result->fetch_assoc()) {
                echo "<li>{$row['meal_name']} ({$row['meal_type']}) - {$row['calories']} calories
                        <form action='dashboard.php' method='post' style='display:inline;'>
                            <input type='hidden' name='delete_meal_id' value='{$row['id']}'>
                            <input type='submit' value='Delete'>
                        </form>
                      </li>";
                $total_calories += $row['calories'];
            }
            echo "</ul>";
        } else {
            echo "No meals logged today.";
        }

        // Calculate recommended calories and alert if over limit
        $bmi = $user['weight'] / (($user['height'] / 100) ** 2);
        $recommended_calories = ($bmi < 18.5) ? 2500 : (($bmi < 25) ? 2000 : 1500);
        echo "<h3>Total Calories Today: $total_calories</h3>";
        echo "<h3>Recommended Calories: $recommended_calories</h3>";
        echo "<h3>BMI: $bmi ";
        if ($bmi < 18.5) echo "(underweight)";
        elseif ($bmi < 25) echo "(healthy weight)";
        elseif ($bmi < 30) echo "(overweight)";
        else echo "(obese)";
        echo "</h3>";

        if ($total_calories > $recommended_calories) {
            $extraCalories = $total_calories - $recommended_calories;
            echo "<p style='color: red;'>You have exceeded your recommended daily calorie intake by <strong> $extraCalories <strong> calories.</p>";
        }
        ?>
    </div>
</body>

</html>
<?php $conn->close(); ?>
