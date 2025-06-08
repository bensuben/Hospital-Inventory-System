<?php
$servername = "localhost";
$username = "root";
$password = " ...";
$dbname = "yulje_inventory";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$itemName = $_POST['item_name'];
$itemID = $_POST['item_id'];
$imageURL = $_POST['image_url'];
$totalItems = $_POST['total_items'];

$sql = "INSERT INTO equipment (item_name, id, image_url, total_items) VALUES ('$itemName', '$itemID', '$imageURL', '$totalItems')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
