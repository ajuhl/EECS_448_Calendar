<?php

require('serverConnect.php');
/**
* add events to the database
* @param[in] $month the month you want an event added to
* @param[in] $day the day you want to add an event to
* @param[in] $event the event you want to be added
* @return none
* \cite learned from w3schools.com at one point
*/
global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
//get variables from http request
$start = $_GET['start'].':00';
$end = $_GET['end'].':00';
$event = $_GET['title'];
$repeat = $_GET['repeat'];
$start[10] = ' ';
$end[10] = ' ';
//insert values into database
$sql = "INSERT INTO calendar (`start`,`stop`,`repeat`,`event`) values('$start','$end','$repeat','$event')";
//if post did not work show error
if($conn->query($sql) != TRUE){
	echo "Error" .$sql . "<br>" . $conn->error;
}

$conn->close();
?>