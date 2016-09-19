var date;
var displayDate;

/**
* Initializes the page
*/
$( document ).ready(function() { //initiated when the page is first loaded
	
	date = getBrowserDate();
	displayDate = getBrowserDate();
	var day_of_month = date.getDate();
	var modal = document.getElementById('dayModal');
	
	generateMonthView(date.getMonth(), date.getFullYear(), date.getDate());
	
	var month_view = [];
	
	/**
	* Clicking on any day
	*/
	$('.days').click(function(e){
		
		e.preventDefault();
		
		var found_string = $(this).attr('id');
		var selected_index = parseInt( found_string.slice("day_".length , found_string.length) );
		var selected_number = parseInt($(this).text());
		
		if (Math.abs(selected_index - selected_number) < 7) {
		
			$(this).css('color', 'black');

			modal.style.display = "block";
			
			var day = parseInt($(this).text());
			var month = displayDate.getMonth();
			var year = displayDate.getFullYear();
			
			setBrowserDate(day,month,year);
			date = getBrowserDate();
			
			generateMonthView(date.getMonth(), date.getFullYear(), date.getDate());
			
			getEvents(month,day);
			//fill the values for creating a new event on this day
			document.getElementById("event_input").value="";
			document.getElementById("month_input").value = month;
			document.getElementById("day_input").value = day;
			document.getElementById("modal-month").innerHTML = getMonthFromNum(month)+" "+day+getNumberEnding(day);
		}
		
	});
	  
	/**
	* Close button of the modal
	*/  
	$('.close').click(function(e){
		
		e.preventDefault();

		modal.style.display = "none";
			
	});
	  
	/**
	* Year Button in top right, activates the year view
	*/  
	$('#button_year').click(function(e){
        
		e.preventDefault();
		
		window.location.href = "YearView.html";
			
			
    });
	
	/**
	* Next month button on the bottom, goes to the next month
	*/
	$('.buttonNextMonth').click(function(e){
		e.preventDefault();
		
		displayDate.setMonth(displayDate.getMonth()+1);
		$('.week').show();
		var highlight_date = 'none';
		if(date.getMonth() == displayDate.getMonth() && date.getFullYear() == displayDate.getFullYear() ){highlight_date = date.getDate();}
		generateMonthView(displayDate.getMonth(), displayDate.getFullYear(), highlight_date);
	});

	/**
	* Previous month button on the bottom, goes to the previous month
	*/
	$('.buttonPreviousMonth').click(function(e){
		e.preventDefault();
		displayDate.setMonth(displayDate.getMonth()-1);
		$('.week').show();
		var highlight_date = 'none';
		if(date.getMonth() == displayDate.getMonth() && date.getFullYear() == displayDate.getFullYear() ){highlight_date = date.getDate();}
		generateMonthView(displayDate.getMonth(), displayDate.getFullYear(), highlight_date);
	});
	  
	/**
	* Week view buttons on the side that are visible in month view.
	*/
	$("#btn_week1").click(function(e) {
		e.preventDefault(e);
		toggleWeekView(0);
	});	
	$("#btn_week2").click(function(e) {
		e.preventDefault(e);
		toggleWeekView(1);
	});
	$("#btn_week3").click(function(e) {
		e.preventDefault(e);
		toggleWeekView(2);
	});
	$("#btn_week4").click(function(e) {
		e.preventDefault();
		toggleWeekView(3);
	});
	$("#btn_week5").click(function(e) {
		e.preventDefault();
		toggleWeekView(4);
	});
	$("#btn_week6").click(function(e) {
		e.preventDefault();
		toggleWeekView(5);
	});

	/**
	* Week view button in the top left that goes to the week of the currently selected date
	*/
	$("#topWeekBtn").click(function(e) {
		e.preventDefault();
		
		toggleMonthView($('#month_table'));
		var day_of_month = date.getDate();
		
		var has_reached_first_day_of_month = false;
		var week = "";
		for(var i = 0; i <= 41; i++ ){
			
			var locator = "#day_".concat(i);
			if($(locator).text() == 1){
				has_reached_first_day_of_month = true;
			}
			if($(locator).text() == day_of_month && has_reached_first_day_of_month){
				
				week = $(locator).parent().attr('id').slice(-1);
			}
			
			
		}
		toggleWeekView(week);
		
	});
});

/**
* Used to display a single week
* @param week_num {int} the index of the week which will be displayed.
*/
function toggleWeekView(week_num){
	
	$('.week').not('#week_'.concat(week_num)).toggle();
	
	if(month_view.length <= 35 ){
		$('#week_5').toggle();
	}
	
}

/**
* Generates the month view
* @param month {int} the month to be displayed
* @param year {int} the year of the month to be displayed
* @param day {int} the current day which should be highlighted, is 'none' if the current day does not fall under this month
*/
function generateMonthView(month, year, day = 'none'){
	
	$('.monthHeader').text(getMonthFromNum(month) + " " + year);
	
	month_view = populateMonthArray(month, year);
	var table_id = "";
	var print_white = false;
	
	for(var i = 0; i <= 41; i++ ){
		
		table_id = "#day_".concat(i);
		if(i >= month_view.length){
			$(table_id).text("");
		}
		else{
			$(table_id).text(month_view[i]);
		}
		
		if(month_view[i] == 1){
			
			print_white = !print_white;
		}
		
		
		if(print_white){
			
			if(month_view[i] == day){
				$(table_id).css('color','black');
			}
			else{
				$(table_id).css('color','white');
			}
		}
		else {
			$(table_id).css('color','#C8C8C8');
		}
		
	}
	
	if( month_view.length <= 35){
		
		$('#week_5').hide();
	}
	else {
		if(document.getElementById('week_5').style.display == 'none' && document.getElementById('week_1').style.display != 'none' && document.getElementById('week_2').style.display != 'none'){
			$('#week_5').show();
		}
	}

	
}

/**
* Gets a string value of a day of the week
* @param num {int} day of the week
* @return {string} the string value of the day of the week
*/
function getDayFromNum(num){
	
	return ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday'][num];
}

/**
* Gets a string value of a month
* @param num {int} the number corresponding to which month
* @return {string} the string value of the month
*/
function getMonthFromNum(num){
	
	return ['January','February','March','April','May','June','July','August','September','October','November','December'][num];
}

/**
* Gets the the number of days in a given month
* @param num {int} the number of the month
* @return {int} the number of days in the month that was input
*/
function getDaysFromMonthNum(num){
	
	return [31,28,31,30,31,30,31,31,30,31,30,31][num];
}

/**
* Gets the string value of the month from the corresponding month number
* @param num {int} month number
* @return {string} the string value of the month
*/
function getNumFromMonth(month){
	
	return ['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(month);
}

/**
* Gets the suffix for a given number in a month
* @param {int} day - the day of the month you want an ending for
* @return {string} the ending for numbers 1 through 31 ex: 1st
*/
function getNumberEnding(day){
	var endings = ['st','nd','rd','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','st','nd','rd','th','th','th','th','th','th','th','st'];
	return endings[day-1];
}

/**
* Creates the year view
* @param a - the html element 
* @return none
*/
function toggleYearView(a) {
    
    
    var nmm =  document.getElementById('nextMonth');
	var pmm =  document.getElementById('prevMonth'); 
	var moo = document.getElementById('month_table');
	var au =  document.getElementById('august');
	var sep =  document.getElementById('september');
	var oc =  document.getElementById('october');
	var no =  document.getElementById('november');
	var de =  document.getElementById('december');
	var ja =  document.getElementById('january');
	var fe =  document.getElementById('february');
	var mar =  document.getElementById('march');
	var ap =  document.getElementById('april');
	var ma =  document.getElementById('may');
    		
    

	moo.style.display = 'none';
	pmm.style.display = 'none';
	nmm.style.display = 'none';
	au.style.display = 'table';
	sep.style.display = 'table';
	oc.style.display = 'table';
	no.style.display = 'table';
	de.style.display = 'table';
	ja.style.display = 'table';
	fe.style.display = 'table';
	mar.style.display = 'table';
	ap.style.display = 'table';
	ma.style.display = 'table';
	
	return;
}

/**
* Creates the month view
* @param month - the html element 
* @return none
*/
function toggleMonthView(month) {
	
	$('.week').show();
	generateMonthView(date.getMonth(), date.getFullYear(), date.getDate());
	displayDate = getBrowserDate();
	
    var mo = document.getElementById('month_table');
    var nm =  document.getElementById('nextMonth');
	var pm =  document.getElementById('prevMonth');
	var aug =  document.getElementById('august');
	var sep =  document.getElementById('september');
	var oct =  document.getElementById('october');
	var nov =  document.getElementById('november');
	var dec =  document.getElementById('december');
	var jan =  document.getElementById('january');
	var feb =  document.getElementById('february');
	var mar =  document.getElementById('march');
	var apr =  document.getElementById('april');
	var may =  document.getElementById('may');
    		
	mo.style.display = 'table';
	pm.style.display = 'inline';
	nm.style.display = 'inline';
	aug.style.display = 'none';
	sep.style.display = 'none';
	oct.style.display = 'none';
	nov.style.display = 'none';
	dec.style.display = 'none';
	jan.style.display = 'none';
	feb.style.display = 'none';
	mar.style.display = 'none';
	apr.style.display = 'none';
	may.style.display = 'none';
	
    return;
}

/**
* Stores the currently selected day in the browser
* @source Information on browser storage was found here: http://www.w3schools.com/html/html5_webstorage.asp
* @param day {int} day of the month
* @param month {int} number of the month to be stored (note January = 0, instead of 1)
* @param year {int} the year to be stored
*/
function setBrowserDate(day,month,year){
	
	if (typeof(Storage) !== "undefined") {
		
		localStorage.setItem("day", day);
		localStorage.setItem("month", month);
		localStorage.setItem("year", year);
	} 
	else {
		
		//if no browser storage do something
	}
}

/**
* Gets the currently selected day in the browser
* @source Information on browser storage was found here: http://www.w3schools.com/html/html5_webstorage.asp
* @return {Date} date object of the date stored in the browser
*/
function getBrowserDate(){
	
	
	if (typeof(Storage) !== "undefined") {

		var day = localStorage.getItem("day", day);
		var month = localStorage.getItem("month", month);
		var year = localStorage.getItem("year", year);
		
		return new Date(year, month, day, 0, 0, 0, 0);
	} 
	else {

		//if no browser storage do something
	}
}
/**
* call the getEvents.php page
* @source information for this funciton from http://www.w3schools.com/ajax/default.asp
* @param {int} month - a number representing the currently selected month
* @param {int} day - a number representing the day you want information for
*/
function getEvents(month,day){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
     document.getElementById("viewEvent").innerHTML = this.responseText;
    	}
  };
  xmlhttp.open("GET", "getEvents.php?month="+month+"&day="+day, true);
  xmlhttp.send();
}
/**
* call the postEvent.php page
* @source information for this funciton from http://www.w3schools.com/ajax/default.asp
* @param {int} month - a number representing the currently selected month
* @param {int} day - a number representing the day you want information for
* @param {string} event - event information the user wants to add
*/
function postEvent(month,day,event){
	var xmlhttp = new XMLHttpRequest();
 	xmlhttp.open("GET", "postEvent.php?month="+month+"&day="+day+"&event="+event, true);
  	xmlhttp.send();
  	for(var x=0;x<3;x++){
  		if(x==2){
  			getEvents(localStorage.getItem("month"),localStorage.getItem("day"));
  		}
  	}
  	document.getElementById("event_input").value="";

}
/**
* delete the event
* @param id {int} the database id of the event you want to delete
*/
function deleteEvent(id){
	var xmlhttp = new XMLHttpRequest();
 	xmlhttp.open("GET", "deleteEvent.php?id="+id, true);
  	xmlhttp.send();
  	for(var x=0;x<3;x++){
  		if(x==2){
  			getEvents(localStorage.getItem("month"),localStorage.getItem("day"));
  		}
  	}
}

/**
* Creates an array of the days that should be displayed for a given month
* @param month {int} number of the month to be generated
* @param year {int} the year to be generated
*/
function populateMonthArray(month, year){
	
	var dummy_date = new Date(year, month, 1, 0, 0, 0, 0);
	var first_day_of_week = dummy_date.getDay();
	var last_index = first_day_of_week + getDaysFromMonthNum(month);
	
	var array = [];

	var num = 1;
	for(var i=first_day_of_week;i< last_index; i++){
		
		array.push(num);
		num++;
	} 
	
	last_month = new Date(dummy_date.getFullYear(),(dummy_date.getMonth()-1),1,0,0,0,0);
	num = GetDaysInMonth(last_month);
	
	for(var i=first_day_of_week-1; i>=0 ;i--) {
		
		array.unshift(num);
		num--;
	}
	num = 1;
	
		
	for(var i = last_index + 1; i <= 45; i++ ){
			
		array.push(num);
		num++;
	}
	
	
	return array;
}

/**
* Creates an HTML table with variables that allows for dynamically loading the months into the year view
* @param id {int} name of the month 
* @param month {int} number of the month to be stored (note January = 0, instead of 1)
* @param year {int} the year to be stored
*/
function LoadMonth(id, month,year) {
	
	var d = new Date(year, month, 0);  // Set to the first day of the month (month is internally stored as 0-11)

	var daysInMonth = GetDaysInMonth(d);  // Get the number of days in the month
	var mon = d.getMonth();
	var htmlContent = "";
	
	// Define table

    htmlContent += "<table width = '25%' height='25%' align='center' id='table' style='display:none' onclick='selectMonthView(" + mon + "," + year + ")'>";
	
	// Display Month, Year

	htmlContent += "<th class='yearView' colspan='7'  onclick='selectMonthView(" + mon + "," + year + ")'>" + GetMonthName(d) + " " + year + "</th>";
	
	// Build Header
	
	htmlContent += "<tr>";
	htmlContent += "<td class = 'yearViewWeekday'>Sun</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Mon</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Tue</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Wed</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Thu</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Fri</td>";
	htmlContent += "<td class = 'yearViewWeekday'>Sat</td>";
	htmlContent += "</tr>";
		
	// Build Detail

	htmlContent += "<tr class='yearViewweek'>";
	
	d.setDate(1);
	
	for (var i = 0; i < d.getDay(); i++) {  // Starting day of the week for the 1st of the month - Sunday = 0 ... Saturday = 6
		htmlContent += "<td class='yearViewdays' onclick='selectMonthView(" + mon + "," + year + ")'></td>";
	}
	
	// Load actual days of the month

	while(d.getMonth() == mon) {
		htmlContent += "<td class='yearViewdays'  onclick='selectMonthView(" + mon + "," + year + ")'>" + d.getDate() + "</td>";

		if (d.getDay() % 7 == 6) {
			htmlContent += "</tr><tr class='yearViewweek'  onclick='selectMonthView(" + mon + "," + year + ")'>";
		};
 
		d.setDate(d.getDate()+1);
	};
	
	if (d.getDay() != 0) {
		for (var i = d.getDay(); i < 14; i++) {
			htmlContent += "<td class='yearViewdays' onclick='selectMonthView(" + mon + "," + year + ")'></td>";
			
			if (d.getDay() % 7 == 6) {
				htmlContent += "</tr class='yearViewweek' onclick='selectMonthView(" + mon + "," + year + ")'><tr>";
			};
 
			d.setDate(d.getDate()+1);	
		};
	};
	
	htmlContent += "</tr>";
	
	htmlContent += "</table>";
	
	document.getElementById(id).innerHTML = htmlContent;
}

/**
* Gets the number of days in each month
* @param d {Date} date object with the month we want
* @return {int} the number of days in the month of the date passed in
*/
function GetDaysInMonth(d) {
	var daysInMonth;
	if (d.getFullYear() % 4 == 0) {
		daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
	} else {
		daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	};
	
	return daysInMonth[d.getMonth()];
}

/**
* Generates the month names
* @param d {Date} date object
* @return {string} the string name of the month
*/
function GetMonthName(d){
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	return monthNames[d.getMonth()];
}

/**
* Shows the month that is selected from Year View. 
* @param month {int} the month to be displayed
* @param year {int} the year of the month to be displayed
*/
function selectMonthView(month,year) {
	
	toggleMonthView(month);
	
	var day = "none";
	if(month == date.getMonth() && year == date.getFullYear()){
		day = date.getDate();
	}
	displayDate = new Date(year,month,1,0,0,0,0);
	generateMonthView(month,year,day);
}