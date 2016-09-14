<?php
require('serverConnect.php');

global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}

$month = $_GET['month'];

$sql = "SELECT count(*) FROM calendar WHERE month like '$month'";
?>