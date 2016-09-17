<?php
require('serverConnect.php');

global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
//get the id of the event to delete
$id = $_GET['id'];
//delete the event
$sql = "DELETE FROM calendar WHERE id='$id'";
if($conn->query($sql) != TRUE){
	echo "Error" .$sql . "<br>" . $conn->error;
}

$conn->close();
?>