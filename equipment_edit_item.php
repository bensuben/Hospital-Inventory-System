<?php
$servername = "localhost";
$username = "root";
$password = "...";
$dbname = "yulje_inventory";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];
$item_name = $_POST['item_name'];
$item_id = $_POST['item_id'];
$image_url = $_POST['image_url'];

$sql = "UPDATE equipment SET item_name='$item_name', id='$item_id', image_url='$image_url' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
