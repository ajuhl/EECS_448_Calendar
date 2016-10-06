<?php

(require('serverConnect.php')) or die('Could not connect to SQL server.');
/**
* get and display events. When selecting a day this gets the events from the database and displays them in the day modal
* @param[in] $month the month you want info for
* @param[in] $day the day you want info for
* @return echo the results on the page
* @cite learned from w3schools.com at one point
*/

function formatRange($start,$end){ //formats a string to display the time range of the event
	if($start->format('Y-m-d')==$end->format('Y-m-d')){ //if the range is on one day
		$range = $start->format('M jS, g:ia') . ' to ' . $end->format('g:ia');
	}else{ //if the range spans multiple days
		$range = $start->format('M jS, g:ia') . ' to ' . $end->format('M jS, g:ia');
	}
	return $range; //return string with datetime range
}

function isInRange($start,$end,$month,$day){ //used to check if $month,$day falls between $start and $end
	$curDayStart = 0;
	$curDayEnd = 0;
	date_default_timezone_set('America/Chicago');
	if($month<5){//check if in year 2016 or 2017
		$curDayStart = datetime::createfromformat('d-n-Y, H:i', $day.'-'.($month+1).'-2017'.', 00:00')->getTimestamp();
		$curDayEnd = datetime::createfromformat('d-n-Y, H:i', $day.'-'.($month+1).'-2017'.', 23:59')->getTimestamp();
	}else{
		$curDayStart = datetime::createfromformat('d-n-Y, H:i', $day.'-'.($month+1).'-2016'.', 00:00')->getTimestamp();
		$curDayEnd = datetime::createfromformat('d-n-Y, H:i', $day.'-'.($month+1).'-2016'.', 23:59')->getTimestamp();
	}
	$rangeStart = $start->getTimestamp();
	$rangeEnd = $end->getTimestamp();
	//checking if event falls on current day by comparing timestamps of ranges
	if(($rangeStart<$curDayStart&&$rangeEnd<$curDayStart)||($rangeStart>$curDayEnd&&$rangeEnd>$curDayEnd)){
		return false;//event does NOT fall on this day
	}else{
		return true;//event does fall on this day
	}
}

function repeatIsInRange($start,$end,$month,$day,$repeat){//checks if repeated events fall on $month,$day
	switch($repeat[0]){
		case 'n'://no repeat
			return false;
			break;
		case 'w'://weekly repeat
			if(strlen($repeat)==1){//plain repeat once per week
				for($x=0;$x<52;$x++){
					$start->add(new DateInterval('P1W'));
					$end->add(new DateInterval('P1W'));
					if(isInRange($start,$end,$month,$day)){
						return true;
					}
				}
			}else{//repeat with day of week values
				for($x=1;$x<strlen($repeat);$x++){
					$curDay = datetime::createfromformat('d-n-Y', $day.'-'.($month+1).'-2016');
					$year=2016;
					if($month<5){//find current day/year based on month value
						$curDay = datetime::createfromformat('d-n-Y', $day.'-'.($month+1).'-2017');
						$year=2017;
					}
					if(intval($repeat[$x])==intval($curDay->format('w'))&&$start->getTimestamp()<=$curDay->getTimestamp()){//if current day matches day of week value
						$interval = $end->getTimestamp() - $start->getTimestamp();
						$start->setDate($year, $month+1, $day);
						$end->setTimestamp($start->getTimestamp()+$interval);
						return true;
					}
				}
			}
			break;
		case 'b'://biweekly repeat
			if(strlen($repeat)==1){//plain repeat once per week
				for($x=0;$x<52;$x++){
					$start->add(new DateInterval('P2W'));
					$end->add(new DateInterval('P2W'));
					if(isInRange($start,$end,$month,$day)){
						return true;
					}
				}
			}else{//repeat with day of week values
				for($x=1;$x<strlen($repeat);$x++){
					$curDay = datetime::createfromformat('d-n-Y', $day.'-'.($month+1).'-2016');
					$year=2016;
					if($month<5){//find current day/year based on month value
						$curDay = datetime::createfromformat('d-n-Y', $day.'-'.($month+1).'-2017');
						$year=2017;
					}
					$timeBetween = $curDay->getTimestamp() - $start->getTimestamp();
					$twoWeeksBetween = ($timeBetween % (60*60*24*14)) < (60*60*24*7);
					if($twoWeeksBetween&&intval($repeat[$x])==intval($curDay->format('w'))&&$start->getTimestamp()<=$curDay->getTimestamp()){//if current day matches day of week value
						$interval = $end->getTimestamp() - $start->getTimestamp();
						$start->setDate($year, $month+1, $day);
						$end->setTimestamp($start->getTimestamp()+$interval);
						return true;
					}
				}
			}
			break;
		case 'm'://monthly repeat
			for($x=0;$x<12;$x++){
				$start->add(new DateInterval('P1M'));
				$end->add(new DateInterval('P1M'));
				if(isInRange($start,$end,$month,$day)){
					return true;
				}
			}
			break;
	}
	return false;
}


global $conn;
if($conn->connect_error){
	die("connection failed: " . $conn->connect_error);
}
$month = $_GET['month'];
$day = $_GET['day'];

$sql = "SELECT * FROM calendar ORDER BY start DESC"; /**< Select statement for the month and day info passed in*/
$result = $conn->query($sql);

$lastEnd = 0;
while($row = $result->fetch_assoc()){
	$startDate = new DateTime($row['start'], new DateTimeZone('America/Chicago'));
	$endDate = new DateTime($row['stop'], new DateTimeZone('America/Chicago'));
	$repeat = $row['repeat'];
	if(isInRange($startDate,$endDate,$month,$day)){
		if($lastEnd>$startDate->getTimestamp()){
			echo "<p>" . $row['event'] . ':  <span class="overlap">' . formatRange($startDate,$endDate) ."</span> <button class=\"delete\" onClick=\"deleteEvent(this.value)\" value=\"".$row['id']."\">x</button></p>";
		}else{
			echo "<p>" . $row['event'] . ':  ' . formatRange($startDate,$endDate) ." <button class=\"delete\" onClick=\"deleteEvent(this.value)\" value=\"".$row['id']."\">x</button></p>";
		}
		$lastEnd = $endDate->getTimestamp();
	}elseif(repeatIsInRange($startDate,$endDate,$month,$day,$repeat)){
		if($lastEnd>$startDate->getTimestamp()){
			echo "<p>" . $row['event'] . ':  <span class="overlap">' . formatRange($startDate,$endDate) ."</span> <button class=\"delete\" onClick=\"deleteEvent(this.value)\" value=\"".$row['id']."\">x</button></p>";
		}else{
			echo "<p>" . $row['event'] . ':  ' . formatRange($startDate,$endDate) ." <button class=\"delete\" onClick=\"deleteEvent(this.value)\" value=\"".$row['id']."\">x</button></p>";
		}
		$lastEnd = $endDate->getTimestamp();
	}
}

$conn->close();
?>
