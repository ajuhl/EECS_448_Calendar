<?php
//database information
$servername = "";
$username = "";
$password = "";
$db_name = "";

//create a connection to database
$conn = mysqli_connect($servername, $username, $password, $db_name);

//test connection
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}

?>