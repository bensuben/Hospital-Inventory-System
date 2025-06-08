<?php
session_start();

// Database connection parameters
$servername = "localhost";
$dbusername = "root";
$dbpassword = "..."; // Your MySQL root password
$dbname = "loginDB";

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = hash('sha256', $_POST['password']);

    // Prepare and execute the SQL query
    $sql = "SELECT id FROM users WHERE username=? AND password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Valid login
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: Home.html");
        exit();
    } else {
        // Invalid login
        echo "Invalid username or password";
    }

    $stmt->close();
}

$conn->close();
?>
