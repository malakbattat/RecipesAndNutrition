<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "recipes_db";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recipe Finder</title>
  <link rel="icon" type="image/x-icon" href="assets/images/logo/Find_a_Recipe.png">
  <!-- <link rel="stylesheet" href="styles.css"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      background-color: #e8f5e9;
      margin: 0;
      padding: 0;
      background-image: url("../assets/images/pattern.jpg");
      background-repeat: repeat;
      background-size: cover;
      background-attachment: fixed;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      margin-top: 100px;
    }

    h1 {
      text-align: center;
      color: #388e3c;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    label {
      font-weight: bold;
      color: #555;
    }

    input,
    select,
    button {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    button {
      background-color: #28a745;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #218838;
    }

    #results {
      margin-top: 20px;
    }

    .recipe {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #fafafa;
    }

    .recipe img {
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }

    .recipe h2 {
      margin: 0;
      font-size: 20px;
      color: #333;
    }

    .recipe p {
      margin: 5px 0;
      color: #666;
    }

    .recipe .details {
      flex-grow: 1;
    }

    .ingredient-name {
      cursor: pointer;
      margin: 5px;
      padding: 5px;
      border: 1px solid #dedede;
      display: inline-block;
      border-radius: 3px;
      background-color: #dfeae4;
    }

    .ingredient-bg {
      background-color: #affdd6;
      border: 1px solid #20d336;
    }

    #alerts {
      color: #d32c2c;
    }

    header {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: rgba(123, 193, 19, 0.8);
      padding: 10px 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
    }

    header img {
      width: 67px;
    }

    .navbar {
      display: flex;
      gap: 10px;
    }

    .btn-primary {
      background-color: #4caf50;
      border-color: #4caf50;
    }

    .btn-primary:hover {
      background-color: #388e3c;
      border-color: #388e3c;
    }

    .btn-primary.active {
      background-color: #1b5e20;
      border-color: #1b5e20;
    }
  </style>
</head>

<body>

  <header>
    <img src="../assets/images/logo/Find_a_Recipe.png" alt="Find a recipe logo">
    <nav class="navbar">
      <a href="../calcs/calcs-menu.html"><button type="button" class="btn btn-primary">Health Calculators</button></a>
      <a href="../index.html"><button type="button" class="btn btn-primary">Home</button></a>
      <a href="find.php"><button type="button" class="btn btn-primary active" aria-pressed="true">Find a recipe</button></a>
      <a href="../calculate.html"><button type="button" class="btn btn-primary">Calculate Calories</button></a>
    </nav>
  </header>
  <div class="container">
    <h1>Find Recipes by Ingredients</h1>

    <form id="searchForm" method="GET" action="" onsubmit="return setAlerts()">
      <label for="ingredients">Choose ingredients:</label>

      <div id="alerts" style="display:none"></div>
      <div class="ingredients-container">
        <?php
        $sql = "SELECT name FROM ingredients";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            echo '<span class="ingredient-name">' . $row["name"] . '</span>';
          }
        }
        ?>
      </div>

      <?php
      $getIngredients = isset($_GET["ingredients"]) ? $_GET["ingredients"] : '';
      ?>
      <input type="text" id="ingredients" name="ingredients" value="<?php echo $getIngredients ?>">
      <label for="diet">Select Diet Type:</label>
      <select id="diet" name="diet">
        <?php
        $sql = "SELECT * FROM diet_types";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            if (isset($_GET["diet"]) && $_GET["diet"] == $row["id"]) {
              echo '<option value="' . $row["id"] . '" selected>' . $row["type_name"] . '</option>';
            } else {
              echo '<option value="' . $row["id"] . '">' . $row["type_name"] . '</option>';
            }
          }
        }
        ?>
      </select>

      <button type="submit">Search</button>
    </form>

    <div id="results">
      <?php
      if (isset($_GET['ingredients']) && isset($_GET['diet'])) {
        $ingredients = isset($_GET['ingredients']) ? explode(',', $_GET['ingredients']) : [];
        $diet = isset($_GET['diet']) ? $_GET['diet'] : '1';
        $ingredients = array_map('trim', $ingredients);
        if (!empty($ingredients)) {
          $ingredientPlaceholders = implode(',', array_fill(0, count($ingredients), '?'));
          $sql = "SELECT r.*, GROUP_CONCAT(i.name SEPARATOR ', ') AS ingredients
                FROM Recipes r
                JOIN Recipe_Ingredients ri ON r.id = ri.recipe_id
                JOIN Ingredients i ON ri.ingredient_id = i.id";
          if ($diet == '1') {
            $sql .= " WHERE i.name IN ($ingredientPlaceholders)";
          } else {
            $sql .= " JOIN Recipe_Diets rd ON r.id = rd.recipe_id
                      JOIN Diet_Types dt ON rd.diet_type_id = dt.id
                      WHERE i.name IN ($ingredientPlaceholders) AND dt.id = ?";
          }
          $sql .= " GROUP BY r.id, r.name, r.instructions, r.servings, r.image_path";
          $stmt = $conn->prepare($sql);
          if ($stmt) {
            $bindParams = $ingredients;
            if ($diet !== '1') {
              $bindParams[] = $diet;
            }
            $types = str_repeat('s', count($ingredients));
            if ($diet !== '1') {
              $types .= 'i';
            }
            $stmt->bind_param($types, ...$bindParams);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
              $resultsHtml = '';
              while ($row = $result->fetch_assoc()) {
                $imagePath = !empty($row['image_path']) ? $row['image_path'] : 'images/default.jpg';
                $resultsHtml .= "
                        <div class='recipe'>
                            <img src='$imagePath' alt='{$row['name']}'>
                            <div class='details'>
                                <h2>{$row['name']}</h2>
                                <p><strong>Servings:</strong> {$row['servings']}</p>
                                <p><strong>Ingredients:</strong> {$row['ingredients']}</p>
                                <p><strong>Instructions:</strong> {$row['instructions']}</p>
                                <a href='recipe-details.php?id={$row['id']}' class='btn btn-secondary'>View Details</a>
                            </div>
                        </div>
                    ";
              }
              echo $resultsHtml;
            } else {
              echo "<hr><center>No matching data found</center>";
            }
            $stmt->close();
          } else {
            echo "Error preparing SQL statement: " . $conn->error;
          }
        } else {
          echo "Please enter at least one ingredient.";
        }
      } else {
        echo "Please provide both ingredients and diet.";
      }

      $conn->close();
      ?>
    </div>
  </div>
  <script src="find-script.js"></script>
</body>

</html>
