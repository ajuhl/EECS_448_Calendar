<?php
require('serverConnect.php');
/**
* add events to the database
* @param[in] $month the month you want an event added to
* @param[in] $day the day you want to add an event to
* @param[in] $event the event you want to be added
* @return none
*/
global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
//get variables from http request
$month = $_GET['month'];
$day = $_GET['day'];
$event = $_GET['event'];
//insert values into database
$sql = "INSERT INTO calendar (month, day, event)
values('$month','$day','$event')";
//if post did not work show error
if($conn->query($sql) != TRUE){
	echo "Error" .$sql . "<br>" . $conn->error;
}

$conn->close();
?>