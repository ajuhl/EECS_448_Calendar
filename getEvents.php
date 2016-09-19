<?php
require('serverConnect.php');
/**
* get and display events. When selecting a day this gets the events from the database and displays them in the day modal
* @param[in] $month the month you want info for
* @param[in] $day the day you want info for
* @return echo the results on the page
* @cite learned from w3schools.com at one point
*/
global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
$month = $_GET['month'];
$day = $_GET['day'];

$sql = "SELECT * FROM calendar WHERE month like '$month' and day like '$day'"; /**< Select statement for the month and day info passed in*/
$result = $conn->query($sql);

while($row = $result->fetch_assoc()){
	echo "<p>" . $row['event'] . " <button class=\"delete\" onClick=\"deleteEvent(this.value)\" value=\"".$row['id']."\">x</button></p>";
}

$conn->close();
?>