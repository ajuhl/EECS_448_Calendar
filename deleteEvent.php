<?php
require('serverConnect.php');
/**
* delete events from the database
* @param[in] $id the unique id of the event you want to delete
* \cite learned from w3schools.com at one point
*/
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