<?php
require('serverConnect.php');

global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}

$month = $_GET['month'];
$day = $_GET['day'];
$event = $_GET['event'];

$sql = "INSERT INTO calendar (month, day, event)
values('$month','$day','$event')";
//if post did not work show error
if($conn->query($sql) != TRUE){
	echo "Error" .$sql . "<br>" . $conn->error;
}

$conn->close();
?>