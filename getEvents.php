<?php
require('serverConnect.php');

global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
$month = $_GET['month'];
$day = $_GET['day'];

$sql = "SELECT * FROM calendar WHERE month like '$month' and day like '$day'";
$result = $conn->query($sql);
//$row = $result->fetch_assoc();
while($row = $result->fetch_assoc()){
	echo "<p>" . $row['event'] . "</p>";
}

$conn->close();
?>