<?php
$servername = "localhost";
$username = "root"; // Replace with your database username
$password = "..."; // Replace with your database password
$dbname = "yulje_inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, item_name, total_items, image_url FROM blood";
$result = $conn->query($sql);

$medicines = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $medicines[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($medicines);
?>
