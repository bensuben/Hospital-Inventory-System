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
$operation = $_POST['operation'];

if ($operation === 'increase') {
    $sql = "UPDATE medicine SET total_items = total_items + 1 WHERE id = $id";
} else if ($operation === 'decrease') {
    $sql = "UPDATE medicine SET total_items = total_items - 1 WHERE id = $id AND total_items > 0";
}

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
